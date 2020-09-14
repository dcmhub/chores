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
      extends: [
        'airbnb-base',
        require.resolve('./rules/base.js'),
        require.resolve('./rules/babel.js'),
        'plugin:prettier/recommended',
        'prettier/babel',
        'prettier/unicorn',
      ],
    },

    {
      // Lint javascript react files
      files: ['**/*.jsx', '**/*.md/*.jsx'],
      extends: [
        'airbnb',
        require.resolve('./rules/base.js'),
        require.resolve('./rules/babel.js'),
        require.resolve('./rules/react.js'),
        'plugin:prettier/recommended',
        'prettier/babel',
        'prettier/react',
        'prettier/unicorn',
      ],
    },

    {
      // Lint typescript files
      files: ['**/*.ts', '**/*.md/*.ts'],
      extends: [
        'airbnb-base',
        require.resolve('./rules/base.js'),
        require.resolve('./rules/typescript.js'),
        'plugin:prettier/recommended',
        'prettier/@typescript-eslint',
        'prettier/unicorn',
      ],
    },

    {
      // Lint typescript react files
      files: ['**/*.tsx', '**/*.md/*.tsx'],
      extends: [
        'airbnb',
        require.resolve('./rules/base.js'),
        require.resolve('./rules/react.js'),
        require.resolve('./rules/typescript.js'),
        'plugin:prettier/recommended',
        'prettier/@typescript-eslint',
        'prettier/react',
        'prettier/unicorn',
      ],
    },

    {
      // Lint typescript declare type files
      files: ['**/*.d.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
};
