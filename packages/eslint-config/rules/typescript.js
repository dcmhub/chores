const fs = require('fs');
const path = require('path');

const project = ['./tsconfig.json'];
const lernaConfigPath = path.join(process.env.PWD || '.', 'lerna.json');

// Check if lerna.json exsits
if (fs.existsSync(lernaConfigPath)) {
  // eslint-disable-next-line import/no-dynamic-require
  const lernaConfig = require(lernaConfigPath);
  if (lernaConfig.packages.length !== 0) {
    project.push('./packages/boss/tsconfig.json');
  }
}

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    lib: ['es2020'],
    project,
    warnOnUnsupportedTypeScriptVersion: true,
  },

  extends: [
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],

  plugins: ['@typescript-eslint'],

  rules: {
    // TODO: properties can't be ignored in interface
    'camelcase': 'off',

    // Turn off some typescript rules
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-var-requires': 'off',

    // Ignore params for no inferrable types
    '@typescript-eslint/no-inferrable-types': [
      'error',
      {
        ignoreParameters: true,
        ignoreProperties: true,
      },
    ],

    // Allowed typescript version no-unused-vars
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
      },
    ],
  },

  settings: {
    'jsdoc': {
      mode: 'typescript',
    },
    'import/extensions': ['.js', '.mjs', '.jsx', '.ts', '.tsx', '.d.ts', '.json'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.mjs', '.jsx', '.ts', '.tsx', '.d.ts', '.json'],
      },
      typescript: {
        project: 'tsconfig.json',
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
    },
  },
};
