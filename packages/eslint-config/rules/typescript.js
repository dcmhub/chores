module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/typescript',
  ],

  plugins: ['@typescript-eslint'],

  rules: {
    // Turn off some typescript rules
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-var-requires': 'off',

    // TODO: eslint-plugin-import can't resolve '@/utils' path alias correctly
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',

    // Ignore params for no inferrable types
    '@typescript-eslint/no-inferrable-types': [
      'error',
      {
        ignoreParameters: true,
        ignoreProperties: true,
      },
    ],

    // Allowed typescript version no-unused-vars
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
      },
    ],

    // Naming conventions for typescript
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE', 'snake_case'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],
  },

  settings: {
    jsdoc: {
      mode: 'typescript',
    },
  },

  overrides: [
    {
      // TODO: The camelcase rule can't effect '.d.ts' file, so turn off it
      files: ['**/*.d.ts'],
      rules: {
        'camelcase': 'off',
        '@typescript-eslint/naming-convention': 'off',
      },
    },
    {
      // Turn off prettier/prettier rule for generated CSS .d.ts files
      files: ['**/*.css.d.ts', '**/*.scss.d.ts', '**/*.sass.d.ts', '**/*.less.d.ts'],
      rules: {
        'prettier/prettier': 'off',
      },
    },
  ],
};
