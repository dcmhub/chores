module.exports = {
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true,
      globalReturn: false,
    },
  },

  overrides: [
    {
      // Lint javascript files
      files: ['**/*.js', '**/*.mjs'],
      extends: [require.resolve('./base.js')],
    },
    {
      // Lint javascript react files
      files: ['**/*.jsx'],
      extends: [require.resolve('./react.js')],
    },
    {
      // Lint typescript files
      files: ['**/*.ts'],
      extends: [require.resolve('./ts-base.js')],
    },
    {
      // Lint typescript react files
      files: ['**/*.tsx'],
      extends: [require.resolve('./ts-react.js')],
    },
  ],
};
