/* fd_training_sn */
module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    indent: ['warn', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['warn', 'single'],
    semi: ['warn', 'always'],
    'no-unused-vars': 'warn',
    eqeqeq: 'error',
    'for-direction': 'error',
  },
};
