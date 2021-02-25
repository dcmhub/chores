module.exports = {
  parser: '@typescript-eslint/parser',

  parserOptions: {
    lib: ['esnext'],
    ecmaVersion: 2021,
    sourceType: 'module',
    project: ['./tsconfig.json', './packages/*/tsconfig.json'],
    tsconfigRootDir: undefined,
    warnOnUnsupportedTypeScriptVersion: true,
    ecmaFeatures: {
      globalReturn: false,
    },
  },

  globals: {
    wx: true,
    App: true,
    Behavior: true,
    Component: true,
    Function: true,
    Page: true,
    Promise: true,
    getApp: true,
    getCurrentPages: true,
    definePlugin: true,
    requirePlugin: true,
  },

  extends: [
    'airbnb-base',

    require.resolve('./rules/base.js'),
    require.resolve('./rules/typescript.js'),
    require.resolve('./rules/tsdoc.js'),

    'plugin:prettier/recommended',
  ],

  settings: {
    'import/resolver': {
      typescript: {
        project: ['./tsconfig.json', './packages/*/tsconfig.json'],
      },
    },
  },
};
