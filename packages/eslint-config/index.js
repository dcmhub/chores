module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true,
      globalReturn: false,
    },
  },

  overrides: [
    {
      // Lint markdown and mdx files
      files: ['**/*.md', '**/*.mdx'],
      processor: 'markdown/markdown',
    },
    {
      // Lint javascript files
      files: ['**/*.js', '**/*.mjs', '**/*.md/*.js'],
      extends: [require.resolve('./base.js')],
    },
    {
      // Lint javascript react files
      files: ['**/*.jsx', '**/*.md/*.jsx'],
      extends: [require.resolve('./react.js')],
    },
    {
      // Lint typescript files
      files: ['**/*.ts', '**/*.md/*.ts'],
      extends: [require.resolve('./ts-base.js')],
    },
    {
      // Lint typescript react files
      files: ['**/*.tsx', '**/*.md/*.tsx'],
      extends: [require.resolve('./ts-react.js')],
    },
  ],
};
