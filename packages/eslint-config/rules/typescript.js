const { rules: baseBestPracticesRules } = require('eslint-config-airbnb-base/rules/best-practices');
const { rules: baseErrorsRules } = require('eslint-config-airbnb-base/rules/errors');
const { rules: baseES6Rules } = require('eslint-config-airbnb-base/rules/es6');
const { rules: baseStyleRules } = require('eslint-config-airbnb-base/rules/style');
const { rules: baseVariablesRules } = require('eslint-config-airbnb-base/rules/variables');

const { rules: baseUserRules } = require('./base');

module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/typescript',
  ],

  plugins: ['@typescript-eslint'],

  rules: {
    // Disable ESLint-based module resolution check for improved monorepo support
    'import/no-unresolved': 'off',

    // Enforce consistent brace style for blocks
    'brace-style': 'off',
    '@typescript-eslint/brace-style': baseStyleRules['brace-style'],

    // Naming conventions
    'camelcase': 'off',
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

    // Enforce spacing around commas
    'comma-spacing': 'off',
    '@typescript-eslint/comma-spacing': baseStyleRules['comma-spacing'],

    // Prefer dot notation
    'dot-notation': 'off',
    '@typescript-eslint/dot-notation': baseBestPracticesRules['dot-notation'],

    // Disallow spacing between function identifiers and their invocations
    'func-call-spacing': 'off',
    '@typescript-eslint/func-call-spacing': baseStyleRules['func-call-spacing'],

    // Enforce consistent indentation
    'indent': 'off',
    '@typescript-eslint/indent': baseStyleRules.indent,

    // Require a space before & after certain keywords
    'keyword-spacing': 'off',
    '@typescript-eslint/keyword-spacing': baseStyleRules['keyword-spacing'],

    // Require an empty line between class members
    'lines-between-class-members': 'off',
    '@typescript-eslint/lines-between-class-members': baseStyleRules['lines-between-class-members'],

    // Disallow Array constructors
    'no-array-constructor': 'off',
    '@typescript-eslint/no-array-constructor': baseStyleRules['no-array-constructor'],

    // Disallow duplicate name in class members
    'no-dupe-class-members': 'off',
    '@typescript-eslint/no-dupe-class-members': baseES6Rules['no-dupe-class-members'],

    // Disallow empty functions, except for standalone funcs/arrows and methods
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': baseBestPracticesRules['no-empty-function'],

    // Disallow unnecessary parentheses
    'no-extra-parens': 'off',
    '@typescript-eslint/no-extra-parens': baseErrorsRules['no-extra-parens'],

    // Disallow unnecessary semicolons
    'no-extra-semi': 'off',
    '@typescript-eslint/no-extra-semi': baseErrorsRules['no-extra-semi'],

    // Disallow use of eval()-like methods
    'no-implied-eval': 'off',
    '@typescript-eslint/no-implied-eval': baseBestPracticesRules['no-implied-eval'],

    // Disallow magic numbers
    'no-magic-numbers': 'off',
    '@typescript-eslint/no-magic-numbers': baseBestPracticesRules['no-magic-numbers'],

    // Disallow declaring the same variable more then once
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': baseBestPracticesRules['no-redeclare'],

    // Disallow declaration of variables already declared in the outer scope
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': baseVariablesRules['no-shadow'],

    // Restrict what can be thrown as an exception
    'no-throw-literal': 'off',
    '@typescript-eslint/no-throw-literal': baseBestPracticesRules['no-throw-literal'],

    // Disallow usage of expressions in statement position
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': baseUserRules['no-unused-expressions'],

    // Disallow unused variables
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': baseUserRules['no-unused-vars'],

    // Disallow use of variables before they are defined
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': baseVariablesRules['no-use-before-define'],

    // Disallow unnecessary constructor
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': baseES6Rules['no-useless-constructor'],

    // Enforce the consistent use of single quotes
    'quotes': 'off',
    '@typescript-eslint/quotes': baseStyleRules.quotes,

    // Require use of semicolons instead of ASI
    'semi': 'off',
    '@typescript-eslint/semi': baseStyleRules.semi,

    // Require or disallow a space before function parenthesis
    'space-before-function-paren': 'off',
    '@typescript-eslint/space-before-function-paren': baseStyleRules['space-before-function-paren'],

    // Allows explicit type declarations for variables and parameters
    '@typescript-eslint/no-inferrable-types': [
      'error',
      {
        ignoreParameters: true,
        ignoreProperties: true,
      },
    ],

    // Allows "Function" type, autofix "Object" type
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          Function: false,
          Object: {
            message: 'Use record instead',
            fixWith: 'Record<string, any>',
          },
        },
      },
    ],

    // Turn off some typescript rules
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    // TODO: eslint-plugin-import can't resolve '@/utils' path alias correctly
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/unbound-method': 'off',
  },

  settings: {
    jsdoc: {
      mode: 'typescript',
    },
  },
};
