module.exports = {
  extends: ['airbnb', 'prettier'],
  parser: 'babel-eslint',
  env: {
    jest: true
  },
  plugins: ['prettier'],
  rules: {
    'react/jsx-filename-extension': 'off',
    'prettier/prettier': ['error'],
    'no-underscore-dangle': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'import/prefer-default-export': 'off',
    'no-param-reassign': 0,
    'import/no-named-as-default': 0,
    radix: 'off'
  },
  globals: {
    fetch: 'writeable',
    document: 'writeable',
    window: 'writeable'
  }
};
