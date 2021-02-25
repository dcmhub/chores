const { rules: baseBestPracticesRules } = require('eslint-config-airbnb-base/rules/best-practices');
const { rules: baseStyleRules } = require('eslint-config-airbnb-base/rules/style');

const { rules: baseUserRules } = require('./base');

module.exports = {
  parser: '@babel/eslint-parser',

  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    requireConfigFile: false,
    allowImportExportEverywhere: false,
    ecmaFeatures: {
      impliedStrict: true,
      globalReturn: false,
    },
    babelOptions: {
      presets: [
        [
          '@dcm/babel-preset',
          {
            alias: true,
          },
        ],
      ],
    },
  },

  rules: {
    'no-invalid-this': 'off',
    'object-curly-spacing': 'off',
    'semi': 'off',
    'new-cap': 'off',
    'no-unused-expressions': 'off',

    '@babel/no-invalid-this': baseBestPracticesRules['no-invalid-this'],
    '@babel/object-curly-spacing': baseStyleRules['object-curly-spacing'],
    '@babel/semi': baseStyleRules.semi,
    '@babel/new-cap': baseUserRules['new-cap'],
    '@babel/no-unused-expressions': baseUserRules['no-unused-expressions'],
  },

  plugins: ['@babel'],

  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
