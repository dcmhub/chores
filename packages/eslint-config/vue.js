module.exports = {
  parser: '@babel/eslint-parser',

  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    requireConfigFile: false,
    allowImportExportEverywhere: false,
    extraFileExtensions: ['.vue'],
    ecmaFeatures: {
      jsx: true,
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

  extends: [
    'airbnb',

    require.resolve('./rules/base.js'),
    require.resolve('./rules/babel.js'),
    require.resolve('./rules/vue.js'),

    'plugin:prettier/recommended',
  ],
};
