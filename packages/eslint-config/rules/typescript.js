module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    lib: ['es2020'],
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
    },
  },
};
