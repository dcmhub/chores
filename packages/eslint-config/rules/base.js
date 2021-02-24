const { rules: baseBestPracticesRules } = require('eslint-config-airbnb-base/rules/best-practices');
const { rules: baseStyleRules } = require('eslint-config-airbnb-base/rules/style');
const { rules: baseVariablesRules } = require('eslint-config-airbnb-base/rules/variables');

const extensions = ['.js', '.mjs', '.jsx', '.ts', '.tsx', '.d.ts', '.vue', '.json'];

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

  plugins: ['import', 'html', 'sort-keys-fix'],

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
  },

  rules: {
    // Turn off some eslint rules
    'global-require': 'off',
    'no-bitwise': 'off',
    'no-restricted-syntax': 'off',

    // Turn off some promise rules
    'promise/always-return': 'off',

    // Turn off some unicorn rules
    'unicorn/filename-case': 'off',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/prefer-spread': 'off',
    'unicorn/prevent-abbreviations': 'off',

    // Turn off some import rules
    'import/extensions': 'off',
    'import/no-cycle': 'off',
    'import/no-default-export': 'off',
    'import/prefer-default-export': 'off',

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

    // Exceptions for wechat miniprogram and vue.js
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
          'value', // for map or filter value
          'record', // for table record
          'draft', // for immer draft
          'model', // for vtk.js
          'publicAPI', // for vtk.js
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
          '**/scripts/**', // script folders

          '**/setupTests.{js,ts}', // setup tests
          '**/{tests,__tests__}/**', // test folders
          '**/{mocks,__mocks__}/**', // mock folers
          'test.{js,ts,jsx,tsx,vue}', // repos with a single test file
          'test-*.{js,ts,jsx,tsx,vue}', // repos with multiple top-level test files
          '**/*{.,_}{test,mock,spec}.{js,ts,jsx,tsx,vue}', // test and mock files

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

          '**/vite.config.{js,ts}', // vite config
          '**/tailwind.config.{js,ts}', // tailwind config
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
            pattern: '@+(dcm|jsdcm|dcmhub|easynm|pubean|fastcms|laozhu)/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: './**/*.+(css|scss|less|png|jpg|jpeg|gif|svg|webp|avif|tiff|mp3|mp4|dcm)',
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
    'import/internal-regex': /^@(dcm|jsdcm|dcmhub|easynm|pubean|fastcms|laozhu)?\//,
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
