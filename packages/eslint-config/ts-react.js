module.exports = {
  parser: '@typescript-eslint/parser',

  parserOptions: {
    lib: ['es2020'],
    ecmaVersion: 2020,
    sourceType: 'module',
    project: ['./tsconfig.json', './packages/*/tsconfig.json'],
    tsconfigRootDir: undefined,
    warnOnUnsupportedTypeScriptVersion: true,
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true,
      globalReturn: false,
    },
  },

  extends: [
    'airbnb-typescript',

    require.resolve('./rules/base.js'),
    require.resolve('./rules/react.js'),
    require.resolve('./rules/typescript.js'),

    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/react',
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
