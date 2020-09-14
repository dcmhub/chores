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

  plugins: ['html', 'markdown'],

  env: {
    browser: true,
    node: true,
    commonjs: true,
    worker: true,
    serviceworker: true,
  },

  globals: {
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
    'no-empty-function': 'off',
    'no-unsafe-finally': 'off',
    'no-restricted-syntax': 'off',
    'no-param-reassign': [
      'error',
      {
        props: false,
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

    // Unused variables rule
    'no-unused-vars': [
      'error',
      {
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
      },
    ],

    // Exceptions for wechat miniprogram
    'new-cap': [
      'error',
      {
        capIsNewExceptions: ['App', 'Page', 'Component', 'Behavior'],
        capIsNewExceptionPattern: '^[A-Z][a-zA-Z0-9]*Service$',
      },
    ],

    // Allow short circuit and ternary expressions
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],

    // Turn off some promise rules
    'promise/always-return': 'off',

    // Turn off jsdoc rule
    'jsdoc/no-undefined-types': 'off',

    // Turn off some unicorn rules
    'unicorn/filename-case': 'off',
    'unicorn/no-fn-reference-in-iterator': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-reduce': 'off',
    'unicorn/no-unreadable-array-destructuring': 'off',
    'unicorn/prefer-query-selector': 'off',
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
          '**/scripts/**', // Scripts
          '**/setupTests.{js,ts}', // Setup Tests
          '**/{test,tests,__tests__}/**', // test folders
          '**/{mock,mocks,__mocks__}/**', // mock folers
          '**/*{.,_}{test,mock}.{js,ts,jsx,tsx}', // test and mock files
          '**/jest.config.{js,ts}', // jest config
          '**/jest-puppeteer.config.{js,ts}', // jest config
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
        'newlines-between': 'never',
        'pathGroups': [
          {
            pattern: '@dcm/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@easynm/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@chenfeng/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after',
          },
        ],
        'groups': [
          ['builtin'],
          ['external'],
          ['internal'],
          ['parent', 'sibling', 'index'],
          ['unknown'],
        ],
      },
    ],
  },

  settings: {
    'polyfills': [],
    'jsdoc': {
      mode: 'jsdoc',
    },
    'html/html-extensions': ['.html', '.ejs'],
    'import/internal-regex': /^@(dcm|easynm|chenfeng)?\//,
    'import/extensions': ['.js', '.mjs', '.jsx', '.json'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.mjs', '.jsx', '.json'],
      },
    },
  },
};
