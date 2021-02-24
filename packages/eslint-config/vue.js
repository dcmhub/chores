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
      globalReturn: false,
    },
  },

  extends: [
    'plugin:vue/vue3-essential',

    '@vue/airbnb',
    require.resolve('./rules/base.js'),

    '@vue/typescript/recommended',
    require.resolve('./rules/typescript.js'),

    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],

  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },

  plugins: ['vue'],

  settings: {
    'import/resolver': {
      typescript: {
        project: ['./tsconfig.json', './packages/*/tsconfig.json'],
      },
    },
  },
};
