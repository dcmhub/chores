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
      impliedStrict: true,
      globalReturn: false,
    },
  },

  extends: [
    require.resolve('./rules/base.js'),
    require.resolve('./rules/typescript.js'),

    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/unicorn',
  ],

  settings: {
    'import/resolver': {
      typescript: {
        project: ['./tsconfig.json', './packages/*/tsconfig.json'],
      },
    },
  },
};
