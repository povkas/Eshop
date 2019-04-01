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
    'react/no-unused-state': 'off',
    radix: 'off',
    'no-unused-vars': 'off'
  },
  globals: {
    fetch: 'writeable',
    document: 'writeable',
    window: 'writeable'
  }
};
