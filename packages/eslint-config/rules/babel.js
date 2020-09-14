module.exports = {
  parser: '@babel/eslint-parser',

  parserOptions: {
    requireConfigFile: false,
    allowImportExportEverywhere: false,
  },

  plugins: ['@babel'],

  rules: {
    'no-invalid-this': 'off',
    'object-curly-spacing': 'off',
    'semi': 'off',
    'new-cap': 'off',
    'no-unused-expressions': 'off',

    '@babel/no-invalid-this': 'error',
    '@babel/object-curly-spacing': ['error', 'always'],
    '@babel/semi': 'error',

    // Exceptions for wechat miniprogram
    '@babel/new-cap': [
      'error',
      {
        capIsNewExceptions: ['App', 'Page', 'Component', 'Behavior'],
      },
    ],

    // Allow short circuit and ternary expressions
    '@babel/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
  },
};
