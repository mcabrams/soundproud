module.exports = {
  env: {
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
    'react/require-default-props': 0, // Not really a concern since we have typechecking in place
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
    }],
    'no-use-before-define': [2, { 'functions': false, 'classes': true }],
  },
  plugins: [
    'jest',
    'flowtype',
  ],
}
