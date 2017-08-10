const postCSSImport = require('postcss-import')
const postCSSReporter = require('postcss-reporter')
const stylelint = require('stylelint')

const path = require('path')

const config = {
  devtool: 'inline-source-map',
  entry: path.resolve(__dirname, 'src/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              importLoaders: 2,
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                stylelint(),
                postCSSImport({
                  plugins: [stylelint()],
                }),
                postCSSReporter({ clearReportedMessages: true }),
              ],
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          'svg-sprite-loader',
          'svgo-loader',
        ],
        include: path.resolve(__dirname, 'src/images/icons'),
      },
    ],
  },
}

module.exports = config
