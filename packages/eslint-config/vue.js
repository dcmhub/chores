module.exports = {
  parser: 'vue-eslint-parser',

  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    parser: '@babel/eslint-parser',
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
    'plugin:react/recommended',

    require.resolve('./rules/base.js'),
    require.resolve('./rules/babel.js'),
    require.resolve('./rules/vue.js'),
  ],

  rules: {
    'no-unused-vars': 'off',
  },
};
