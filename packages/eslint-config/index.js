const fs = require('fs');
const path = require('path');

const project = ['tsconfig.json'];
const lernaConfigPath = path.join(process.env.PWD || '.', 'lerna.json');

// Check if lerna.json exsits
if (fs.existsSync(lernaConfigPath)) {
  // eslint-disable-next-line import/no-dynamic-require
  const lernaConfig = require(lernaConfigPath);
  if (lernaConfig.packages.length !== 0) {
    lernaConfig.packages.forEach((pkg) => project.push(path.join(pkg, 'tsconfig.json')));
  }
}

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
      parserOptions: { project },
      extends: [
        'airbnb-typescript/base',

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
      parserOptions: { project },
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
    },

    {
      // Lint typescript declare type files
      files: ['**/*.d.ts'],
      rules: {
        'camelcase': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
};
