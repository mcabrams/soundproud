module.exports = {
  env: {
    browser: true,
  },
  parser: 'babel-eslint',
  extends: [
    'plugin:jest/recommended',
    'airbnb',
  ],
  rules: {
    semi: ['error', 'never'],
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'jsx-a11y/media-has-caption': 0,
    'react/jsx-closing-bracket-location': 1,
  },
  plugins: [
    'jest',
  ],
}
