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
    'linebreak-style': 0
  },
  globals: {
    fetch: 'writeable',
    document: 'writeable',
    window: 'writeable'
  }
};
