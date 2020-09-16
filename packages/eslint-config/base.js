module.exports = {
  parser: '@babel/eslint-parser',

  parserOptions: {
    ecmaVersion: 2020,
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

  extends: [
    'airbnb-base',

    require.resolve('./rules/base.js'),
    require.resolve('./rules/babel.js'),

    'plugin:prettier/recommended',
    'prettier/babel',
    'prettier/unicorn',
  ],
};
