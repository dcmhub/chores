const { rules: baseBestPracticesRules } = require('eslint-config-airbnb-base/rules/best-practices');
const { rules: baseStyleRules } = require('eslint-config-airbnb-base/rules/style');
const { rules: baseVariablesRules } = require('eslint-config-airbnb-base/rules/variables');

const extensions = ['.js', '.mjs', '.jsx', '.ts', '.d.ts', '.tsx', '.vue'];

module.exports = {
  extends: [
    'plugin:unicorn/recommended',
    'plugin:promise/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:eslint-comments/recommended',
    'plugin:compat/recommended',
  ],

  env: {
    browser: true,
    node: true,
    commonjs: true,
    worker: true,
    serviceworker: true,
  },

  globals: {
    workbox: true,
  },

  rules: {
    // Turn off some over-strict eslint rules
    'global-require': 'off',
    'import/extensions': 'off',
    'no-bitwise': 'off',
    'no-restricted-syntax': 'off',
    'promise/always-return': 'off',
    'sort-imports': 'off',
    'import/first': 'off',
    'import/no-default-export': 'off',
    'import/prefer-default-export': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/prefer-spread': 'off',
    'unicorn/prevent-abbreviations': 'off',

    // Add simple import sort rules
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    // Allow implicit return, check forEach with return value
    'array-callback-return': [
      'error',
      {
        allowImplicit: true,
        checkForEach: true,
      },
    ],

    // Camel case variables
    'camelcase': [
      'error',
      {
        properties: 'never',
        ignoreDestructuring: true,
        ignoreImports: true,
        ignoreGlobals: true,
        allow: [],
      },
    ],

    // Add exceptions for wechat miniprogram and vue.js
    'new-cap': [
      'error',
      {
        newIsCap: true,
        newIsCapExceptions: [...baseStyleRules['new-cap'][1].newIsCapExceptions],

        capIsNew: true,
        capIsNewExceptions: [
          ...baseStyleRules['new-cap'][1].capIsNewExceptions,

          'App',
          'Behavior',
          'Component',
          'Layouts',
          'Markdown',
          'Page',
          'Pages',
          'ViteComponents',
          'ViteIcons',
          'ViteIconsResolver',
          'VitePWA',
          'ViteSSG',
          'Vue',
          'VueI18n',
          'WindiCSS',
        ],
        capIsNewExceptionPattern: '^[A-Z]\\S*Service$',
      },
    ],

    // Allow console.warn and console.error
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error'],
      },
    ],

    // Allow empty catch
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true,
      },
    ],

    // Disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          ...baseBestPracticesRules['no-param-reassign'][1].ignorePropertyModificationsFor,

          // You can add new exclusions here
          'value', // For map or filter value
          'record', // For table record
          'draft', // For immer draft
          'model', // For vtk.js inheritance
          'publicAPI', // For vtk.js inheritance
        ],
      },
    ],

    // Allow some global variables
    'no-underscore-dangle': [
      'error',
      {
        allow: ['__VERSION__', '__BUILD_TIME__', '__COS_DOMAIN__', '__COS_DICOM_DOMAIN__'],
        allowAfterThis: true,
        allowAfterSuper: true,
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

    // Allow short circuit and ternary expressions
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: false,
        enforceForJSX: true,
      },
    ],

    // Ignore extraneous dependencies in build tools
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: false,
        devDependencies: [
          '**/bin/**', // bin folders
          '**/config/**', // config folders
          '**/configs/**', // config folders
          '**/scripts/**', // script folders
          '**/setupTests.{js,ts}', // setup tests
          '**/{tests,__tests__}/**', // test folders
          '**/{mocks,__mocks__}/**', // mock folers
          'test.{js,mjs,ts,jsx,tsx,vue}', // repos with a single test file
          'test-*.{js,ts,mjs,jsx,tsx,vue}', // repos with multiple top-level test files
          '**/*{.,_}{test,mock,spec}.{js,mjs,ts,jsx,tsx,vue}', // test and mock files
          '**/jest.config.{js,ts}', // jest config
          '**/jest.setup.{js,ts}', // jest setup
          '**/jest-puppeteer.config.{js,ts}', // jest puppeteer config
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
          '**/tailwind.config.{js,ts}', // tailwind config
          '**/next.config.{js,ts}', // next.js config
          '**/server.{js,ts}', // next.js server config
          '**/.umirc.{js,ts}', // umi.js config
          '**/.umirc.*.{js,ts}', // umi.js config
          '**/vue.config.{js,ts}', // vue-cli config
          '**/vite.config.{js,ts}', // vite config
        ],
      },
    ],
  },

  plugins: ['import', 'simple-import-sort', 'sort-keys-fix'],

  settings: {
    // Settings for eslint import plugin
    'import/extensions': [...extensions, '.json'],
    'import/internal-regex': /^@(dcm|jsdcm|dcmhub|easynm|pubean|fastcms|laozhu)?\//,
    'import/parsers': {
      '@babel/eslint-parser': extensions,
    },
    'import/resolver': {
      node: {
        extensions: [...extensions, '.json'],
      },
    },

    // Settings for eslint compat plugin
    'polyfills': [],
  },
};
