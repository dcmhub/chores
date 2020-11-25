const { rules: baseBestPracticesRules } = require('eslint-config-airbnb-base/rules/best-practices');
const { rules: baseStyleRules } = require('eslint-config-airbnb-base/rules/style');
const { rules: baseVariablesRules } = require('eslint-config-airbnb-base/rules/variables');

const extensions = ['.js', '.mjs', '.jsx', '.ts', '.tsx', '.d.ts', '.json'];

module.exports = {
  extends: [
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'plugin:jsdoc/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:compat/recommended',
  ],

  plugins: ['import', 'html'],

  env: {
    browser: true,
    node: true,
    commonjs: true,
    worker: true,
    serviceworker: true,
  },

  globals: {
    workbox: true,

    // Global variables for wechat miniprogram
    wx: true,
    App: true,
    Behavior: true,
    Component: true,
    Function: true,
    Page: true,
    Promise: true,
    getApp: true,
    getCurrentPages: true,
    definePlugin: true,
    requirePlugin: true,

    // Global variables for react app
    REACT_APP_ENV: true,
  },

  rules: {
    'global-require': 'off',
    'no-bitwise': 'off',
    'no-unsafe-finally': 'off',
    'no-restricted-syntax': 'off',

    // Disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          ...baseBestPracticesRules['no-param-reassign'][1].ignorePropertyModificationsFor,

          // You can add new exclusions here
          'v', // for map or filter value shortcut
          'value', // for map or filter value
          'r', // for table record shortcut
          'record', // for table record
          'draft', // for immer draft
          'model', // for vtk.js
          'publicAPI', // for vtk.js
        ],
      },
    ],

    // Allow console.warn and console.error
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error'],
      },
    ],

    // Camel case variables
    'camelcase': [
      'error',
      {
        properties: 'never',
        ignoreDestructuring: true,
      },
    ],

    // Allow empty catch
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true,
      },
    ],

    // Unused variables rule
    'no-unused-vars': [
      'error',
      {
        ...baseVariablesRules['no-unused-vars'][1],
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],

    // Exceptions for wechat miniprogram
    'new-cap': [
      'error',
      {
        newIsCap: true,
        capIsNew: true,
        newIsCapExceptions: [
          ...baseStyleRules['new-cap'][1].newIsCapExceptions,
          // You can add new exceptions here
        ],
        capIsNewExceptions: [
          ...baseStyleRules['new-cap'][1].capIsNewExceptions,
          // You can add new exceptions here
          'App',
          'Behavior',
          'Component',
          'Page',
        ],
        capIsNewExceptionPattern: '^[A-Z]\\S*Service$',
      },
    ],

    // Allow short circuit and ternary expressions
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: false,
      },
    ],

    // Turn off some promise rules
    'promise/always-return': 'off',

    // Turn off jsdoc rule
    'jsdoc/no-undefined-types': 'off',

    // Turn off some unicorn rules
    'unicorn/explicit-length-check': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/no-fn-reference-in-iterator': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-reduce': 'off',
    'unicorn/no-unreadable-array-destructuring': 'off',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/prefer-query-selector': 'off',
    'unicorn/prefer-ternary': 'off',
    'unicorn/prevent-abbreviations': 'off',

    // Turn off some import rules
    'import/extensions': 'off',
    'import/no-cycle': 'off',
    'import/no-default-export': 'off',
    'import/prefer-default-export': 'off',

    // Ignore extraneous dependencies in build tools
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: false,
        devDependencies: [
          '**/scripts/**', // script folders

          '**/setupTests.{js,ts}', // setup tests
          '**/{tests,__tests__}/**', // test folders
          '**/{mocks,__mocks__}/**', // mock folers
          'test.{js,ts,jsx,tsx}', // repos with a single test file
          'test-*.{js,ts,jsx,tsx}', // repos with multiple top-level test files
          '**/*{.,_}{test,mock,spec}.{js,ts,jsx,tsx}', // test and mock files

          '**/jest.config.{js,ts}', // jest config
          '**/jest.setup.{js,ts}', // jest setup
          '**/jest-puppeteer.config.{js,ts}', // jest puppeteer config

          '**/vue.config.{js,ts}', // vue-cli config

          '**/.webpack/*.{js,ts}', // webpack config
          '**/webpack.config.{js,ts}', // webpack config
          '**/webpack.config.*.{js,ts}', // webpack config

          '**/rollup.config.{js,ts}', // rollup config
          '**/rollup.config.*.{js,ts}', // rollup config

          '**/babel.config.{js,ts}', // babel config
          '**/.babelrc.{js,ts}', // babel config

          '**/prettier.config.{js,ts}', // prettier config
          '**/.prettierrc.{js,ts}', // prettier config

          '**/.stylelintrc.{js,ts}', // stylelint config
          '**/stylelint.config.{js,ts}', // stylelint config

          '**/.eslintrc.{js,ts}', // eslint config

          '**/postcss.config.{js,ts}', // postcss config
          '**/.postcssrc.{js,ts}', // postcss config

          '**/next.config.{js,ts}', // next.js config
          '**/server.{js,ts}', // next.js server config

          '**/.umirc.{js,ts}', // umi.js config
          '**/.umirc.*.{js,ts}', // umi.js config
          '**/config/*.{js,ts}', // umi.js config
        ],
      },
    ],

    // Order the imports
    'import/order': [
      'warn',
      {
        'alphabetize': {
          order: 'asc',
          caseInsensitive: true,
        },
        'groups': [
          ['builtin'],
          ['external', 'internal'],
          ['parent', 'sibling', 'index'],
          ['unknown'],
        ],
        'newlines-between': 'always',
        'pathGroups': [
          {
            pattern: '+(ahooks|clsx|dayjs|lodash-es|react|react-dom|umi|umi-request)',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@+(ant-design|material-ui)/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@+(dcm|easynm|chenfeng)/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: './**/*.+(css|scss|sass|less|png|jpg|jpeg|gif|svg|webp|avif|tiff|bmp|mp3|mp4)',
            group: 'unknown',
            position: 'before',
          },
        ],
        'pathGroupsExcludedImportTypes': ['umi'],
      },
    ],
  },

  settings: {
    // Settings for eslint html plugin
    'html/html-extensions': ['.html', '.ejs'],

    // Settings for eslint import plugin
    'import/extensions': extensions,
    'import/internal-regex': /^@(dcm|easynm|chenfeng)?\//,
    'import/parsers': {
      '@babel/eslint-parser': ['.js', '.jsx', '.mjs'],
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
    },
    'import/resolver': {
      node: {
        extensions,
      },
    },

    // Settings for eslint jsdoc plugin
    'jsdoc': {
      mode: 'jsdoc',
    },

    // Settings for eslint compat plugin
    'polyfills': [],
  },
};
