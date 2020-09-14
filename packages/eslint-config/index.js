const fs = require('fs');
const path = require('path');

/** Init tsconfig.json files and root directory */
let tsconfigRootDir;
let tsconfigFiles = './tsconfig.json';

const pwd = process.env.PWD || '.';
const lernaConfigFile = path.join(pwd, 'lerna.json');
const rootTsConfigFile = path.join(pwd, 'tsconfig.json');
/** Check if lerna.json file exsits in project root */
const hasLernaConfig = fs.existsSync(lernaConfigFile);
/** Check if root tsconfig.json file exists */
const hasRootTsConfig = fs.existsSync(rootTsConfigFile);

if (hasLernaConfig) {
  // eslint-disable-next-line import/no-dynamic-require
  const lernaConfig = require(lernaConfigFile);

  // Add tsconfig.json of all lerna packages
  if (lernaConfig.packages.length !== 0) {
    tsconfigFiles = hasRootTsConfig ? [tsconfigFiles] : [];
    lernaConfig.packages.forEach((pkg) => {
      tsconfigFiles.push(path.join(pkg, 'tsconfig.json'));
    });
  }
}

// Use default tsconfig.json in eslint-config package
if (!hasRootTsConfig && !Array.isArray(tsconfigFiles)) {
  tsconfigRootDir = __dirname;
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

  extends: ['airbnb-base', require.resolve('./rules/base.js'), 'prettier', 'prettier/unicorn'],

  overrides: [
    {
      // Lint markdown and mdx files
      files: ['**/*.md', '**/*.mdx'],
      processor: 'markdown/markdown',
    },

    {
      // Lint javascript files
      files: ['**/*.js', '**/*.mjs', '**/*.md/*.js'],
      parser: '@babel/eslint-parser',
      parserOptions: {
        requireConfigFile: false,
        allowImportExportEverywhere: false,
        babelOptions: {},
      },
    },

    {
      // lint javascript react files
      files: ['**/*.jsx', '**/*.md/*.jsx'],
      parser: '@babel/eslint-parser',
      parserOptions: {
        requireConfigFile: false,
        allowImportExportEverywhere: false,
        babelOptions: {},
      },
      extends: [
        'airbnb',
        require.resolve('./rules/base.js'),
        require.resolve('./rules/react.js'),
        'prettier',
        'prettier/react',
        'prettier/unicorn',
      ],
    },

    {
      // lint typescript files
      files: ['**/*.ts', '**/*.md/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        lib: ['es2020'],
        tsconfigRootDir,
        project: tsconfigFiles,
        warnOnUnsupportedTypeScriptVersion: true,
      },
      extends: [
        'airbnb-typescript/base',
        require.resolve('./rules/base.js'),
        require.resolve('./rules/typescript.js'),
        'prettier',
        'prettier/@typescript-eslint',
        'prettier/unicorn',
      ],
    },

    {
      // lint typescript react files
      files: ['**/*.tsx', '**/*.md/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        lib: ['es2020'],
        tsconfigRootDir,
        project: tsconfigFiles,
        warnOnUnsupportedTypeScriptVersion: true,
      },
      extends: [
        'airbnb-typescript',
        require.resolve('./rules/base.js'),
        require.resolve('./rules/react.js'),
        require.resolve('./rules/typescript.js'),
        'prettier',
        'prettier/@typescript-eslint',
        'prettier/react',
        'prettier/unicorn',
      ],
    },
  ],
};
