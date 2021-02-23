module.exports = {
  parser: 'vue-eslint-parser',

  parserOptions: {
    lib: ['esnext'],
    ecmaVersion: 2021,
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    project: ['./tsconfig.json', './packages/*/tsconfig.json'],
    tsconfigRootDir: undefined,
    warnOnUnsupportedTypeScriptVersion: true,
    extraFileExtensions: ['.vue'],
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true,
      globalReturn: false,
    },
  },

  extends: [
    'airbnb',

    require.resolve('./rules/base.js'),
    require.resolve('./rules/vue.js'),
    require.resolve('./rules/typescript.js'),

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
