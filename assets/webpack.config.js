const path = require('path')

const config = {
  devtool: 'inline-source-map',
  entry: path.resolve(__dirname, 'src/app.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
            options: {sourceMap: true}
          },
          {
            loader: "sass-loader", // compiles Sass to CSS
            options: {sourceMap: true}
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          'svg-sprite-loader',
          'svgo-loader'
        ],
        include: path.resolve(__dirname, 'src/images/icons')
      }
    ]
  }
}

module.exports = config
