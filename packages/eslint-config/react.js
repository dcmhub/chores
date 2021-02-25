module.exports = {
  parser: '@babel/eslint-parser',

  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    requireConfigFile: false,
    allowImportExportEverywhere: false,
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
            react: true,
          },
        ],
      ],
    },
  },

  extends: [
    'airbnb',

    require.resolve('./rules/base.js'),
    require.resolve('./rules/babel.js'),
    require.resolve('./rules/react.js'),
    require.resolve('./rules/jsdoc.js'),

    'plugin:prettier/recommended',
  ],
};
