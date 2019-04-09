module.exports = {
  extends: ['airbnb', 'prettier'],
  parser: 'babel-eslint',
  env: {
    jest: true
  },
  plugins: ['prettier'],
  rules: {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'prettier/prettier': ['error'],
    'linebreak-style': 0,
    'import/no-unresolved': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'import/prefer-default-export': 'off',
    'no-param-reassign': 0,
    'import/no-named-as-default': 0
  },
  globals: {
    fetch: 'writeable',
    document: 'writeable',
    window: 'writeable'
  }
};
