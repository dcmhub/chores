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
      globalReturn: false,
    },
  },

  extends: [
    'airbnb-base',
    'plugin:vue/vue3-recommended',

    require.resolve('./rules/base.js'),
    require.resolve('./rules/typescript.js'),
  ],

  plugins: ['vue'],

  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
};
