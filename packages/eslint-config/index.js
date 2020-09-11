const fs = require('fs');
const path = require('path');

/** Filename extensions supportted by eslint */
const extensions = ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.d.ts', '.json'];

/** Has tsconfig.json or not */
const hasTsConfig = fs.existsSync(path.join(process.env.PWD || '.', 'tsconfig.json'));

const eslintConfig = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    requireConfigFile: false,
    allowImportExportEverywhere: false,

    // https://babeljs.io/docs/en/options
    babelOptions: {},

    ecmaFeatures: {
      jsx: true,
      impliedStrict: true,
      globalReturn: false,
    },
  },

  extends: [
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'plugin:jest/recommended',
    'plugin:jsdoc/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:markdown/recommended',
    'plugin:compat/recommended',
    'plugin:prettier/recommended',
    'prettier/react',
    'prettier/unicorn',
  ],

  plugins: ['react-hooks', 'html'],

  env: {
    browser: true,
    node: true,
    commonjs: true,
    worker: true,
    jest: true,
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
    'no-bitwise': 'off',
    'no-console': 'warn',
    'no-empty-function': 'off',
    'no-restricted-syntax': 'off',
    'no-param-reassign': [
      'error',
      {
        props: false,
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
      },
    ],

    // Disable some promise rules
    'promise/always-return': 'off',

    // Disable some unicorn rules
    'unicorn/no-fn-reference-in-iterator': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-reduce': 'off',
    'unicorn/no-unreadable-array-destructuring': 'off',
    'unicorn/prefer-query-selector': 'off',
    'unicorn/prevent-abbreviations': 'off',

    // Support kekab and pascal case filenames
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          kebabCase: true,
          pascalCase: true,
        },
        ignore: [],
      },
    ],

    // Turn off some import rules
    'import/extensions': 'off',
    'import/no-cycle': 'off',
    'import/no-default-export': 'off',
    'import/prefer-default-export': 'off',

    // Fix unresolved for import aliases
    'import/no-unresolved': [
      'error',
      {
        caseSensitive: true,
        commonjs: true,
        ignore: ['^@/', '^@@/'],
      },
    ],

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

    // JSX A11y rules
    'jsx-a11y/click-events-have-key-events': 'error',

    // Add caption for medias
    'jsx-a11y/media-has-caption': [
      'error',
      {
        audio: ['Audio'],
        video: ['Video'],
        track: ['Track'],
      },
    ],

    // Fix Link component of next.js
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],

    // React rules
    'react/forbid-prop-types': 'off',
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', 'tsx'],
      },
    ],
    'react/jsx-one-expression-per-line': [
      'error',
      {
        allow: 'single-child',
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/no-array-index-key': 'warn',
    'react/prop-types': 'off',
    'react/sort-comp': 'warn',

    // React hooks rules
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: 'useRecoilCallback',
      },
    ],
  },

  settings: {
    'polyfills': [],
    'html/html-extensions': ['.html', '.ejs'],
    'import/internal-regex': /^@(dcm|easynm|chenfeng)?\//,
    'import/extensions': extensions,
    'import/resolver': {
      node: {
        extensions,
      },
    },
    'react': {
      version: 'detect',
    },
    'jest': {
      version: 26,
    },
    'jsdoc': {
      mode: 'jsdoc',
    },
  },

  overrides: [
    {
      // Specified typescript rules
      files: ['*.ts', '*.tsx'],

      parser: '@typescript-eslint/parser',
      parserOptions: {
        lib: ['es2020'],
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: !hasTsConfig ? __dirname : undefined,
        warnOnUnsupportedTypeScriptVersion: true,
        ecmaFeatures: {
          jsx: true,
          impliedStrict: true,
          globalReturn: false,
        },
      },

      extends: [
        'airbnb-typescript',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:promise/recommended',
        'plugin:unicorn/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:jsdoc/recommended',
        'plugin:eslint-comments/recommended',
        'plugin:compat/recommended',
        'plugin:prettier/recommended',
        'prettier/@typescript-eslint',
        'prettier/react',
        'prettier/unicorn',
      ],

      rules: {
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
        'no-unused-vars': 'off',
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
        jsdoc: {
          mode: 'typescript',
        },
      },
    },
  ],
};

module.exports = eslintConfig;
