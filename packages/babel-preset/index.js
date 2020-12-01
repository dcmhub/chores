const path = require('path');

const { declare } = require('@babel/helper-plugin-utils');

module.exports = declare((api, options = {}) => {
  const env = api.env();
  const isDev = env === 'development';

  api.assertVersion('^7.10.0');
  api.cache.using(() => isDev);

  const {
    targets = {},
    modules = 'auto',
    debug = false,
    include,
    exclude,
    useBuiltIns = false,
    useESModules = !modules,
    react = false,
    typescript = false,
    transformRuntime = true,
    alias = false,
  } = options;

  // Initial babel presets
  const presets = [
    [
      require('@babel/preset-env').default,
      {
        targets,
        bugfixes: true,
        spec: false,
        loose: false,
        modules,
        debug,
        include: Array.isArray(include) ? include : [],
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
        useBuiltIns,
        forceAllTransforms: false,
        ignoreBrowserslistConfig: false,
        browserslistEnv: env ?? 'production',
        shippedProposals: false,
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

  // Add react preset and plugins
  if (react) {
    presets.push([
      require('@babel/preset-react').default,
      {
        runtime: 'automatic',
        development: isDev,
        importSource: isDev ? '@welldone-software/why-did-you-render' : 'react',
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
        onlyRemoveTypeImports: true,
      },
    ]);
  }

  // Add transform runtime plugin
  if (transformRuntime) {
    plugins.push([
      require('@babel/plugin-transform-runtime').default,
      {
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules,
        absoluteRuntime: path.dirname(require.resolve('@babel/runtime/package.json')),
        version: require('@babel/runtime/package.json').version,
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

  return {
    presets,
    plugins,
    sourceMaps: isDev ? 'inline' : true,
  };
});
