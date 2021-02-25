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

  extends: [
    'airbnb-base',

    require.resolve('./rules/base.js'),
    require.resolve('./rules/typescript.js'),
    require.resolve('./rules/weapp.js'),
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
