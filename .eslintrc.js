module.exports = {
  env: {
    browser: true,
    'jest/globals': true,
  },
  parser: 'babel-eslint',
  extends: [
    'plugin:jest/recommended',
    'airbnb',
    'plugin:flowtype/recommended',
  ],
  rules: {
    semi: ['error', 'never'],
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'jsx-a11y/media-has-caption': 0,
    'react/jsx-closing-bracket-location': 1,
    'flowtype/no-types-missing-file-annotation': 0,
    'react/sort-comp': [1, {
      order: [
        'type-annotations',
        'static-methods',
        'lifecycle',
        'everything-else',
        'render',
      ],
    }]
  },
  plugins: [
    'jest',
    'flowtype',
  ],
}
