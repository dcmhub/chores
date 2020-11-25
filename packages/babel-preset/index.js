const path = require('path');

const { declare } = require('@babel/helper-plugin-utils');

module.exports = declare((api, options = {}) => {
  const env = api.env();
  const isDev = env === 'development';

  api.assertVersion('^7.0.0');
  api.cache.using(() => isDev);

  const {
    debug = false,
    targets = {},
    modules = false,
    useBuiltIns = 'usage',
    useESModules = !modules,
    exclude,
    react = false,
    typescript = false,
    alias = false,
    transformRuntime = true,
  } = options;

  // Initial babel presets
  const presets = [
    [
      require('@babel/preset-env'),
      {
        debug,
        targets,
        modules,
        useBuiltIns,
        corejs: 3,
        bugfixes: true,
        browserslistEnv: env ?? 'production',
        exclude: Array.isArray(exclude)
          ? exclude
          : [
              'transform-async-to-generator',
              'transform-literals',
              'transform-modules-amd',
              'transform-modules-systemjs',
              'transform-modules-umd',
              'transform-new-target',
              'transform-regenerator',
              'transform-sticky-regex',
              'transform-template-literals',
              'transform-typeof-symbol',
              'transform-unicode-regex',
            ],
      },
    ],
  ];

  // Initial babel plugins
  const plugins = [
    [require('@babel/plugin-proposal-decorators').default, { legacy: true }],
    [require('@babel/plugin-proposal-class-properties').default, { loose: true }],
    [require('@babel/plugin-proposal-logical-assignment-operators').default, {}],
    [require('@babel/plugin-proposal-nullish-coalescing-operator').default, { loose: true }],
    [require('@babel/plugin-proposal-numeric-separator').default, {}],
    [require('@babel/plugin-proposal-optional-chaining').default, { loose: true }],
    [require('@babel/plugin-proposal-private-methods').default, { loose: true }],
    [require('@babel/plugin-syntax-top-level-await').default],
  ];

  // Add transform runtime plugin
  if (transformRuntime) {
    plugins.push([
      require('@babel/plugin-transform-runtime'),
      {
        useESModules,
        version: require('@babel/runtime/package.json').version,
        absoluteRuntime: path.dirname(require.resolve('@babel/runtime/package.json')),
      },
    ]);
  }

  // Support path alias with babel
  if (alias) {
    plugins.push([
      require('babel-plugin-module-resolver').default,
      {
        root: ['.'],
        alias: {
          '@/assets': './src/assets',
          '@/components': './src/components',
          '@/constants': './src/constants',
          '@/defaultSettings': './src/defaultSettings',
          '@/interfaces': './src/interfaces',
          '@/layouts': './src/layouts',
          '@/locales': './src/locales',
          '@/models': './src/models',
          '@/pages': './src/pages',
          '@/services': './src/services',
          '@/utils': './src/utils',
        },
      },
    ]);
  }

  // Add react preset and plugins
  if (react) {
    presets.push([
      require('@babel/preset-react').default,
      {
        development: isDev,
        runtime: 'automatic',
        useBuiltIns: true,
      },
    ]);

    if (!isDev) {
      plugins.push([require('@babel/plugin-transform-react-constant-elements').default, {}]);
      plugins.push([require('@babel/plugin-transform-react-inline-elements').default, {}]);
      plugins.push([
        require('babel-plugin-transform-react-remove-prop-types').default,
        {
          removeImport: true,
        },
      ]);
    }
  }

  // Add typescript preset and plugins
  if (typescript) {
    presets.push([
      require('@babel/preset-typescript').default,
      {
        isTSX: react,
        allExtensions: react,
        allowNamespaces: true,
        allowDeclareFields: true,
      },
    ]);
  }

  return {
    presets,
    plugins,
    sourceMaps: isDev ? 'inline' : true,
  };
});
