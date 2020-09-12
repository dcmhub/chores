const path = require('path');
const { declare } = require('@babel/helper-plugin-utils');

module.exports = declare((api, options = {}) => {
  const isDev = api.env('development');

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
    transformRuntime = true,
    importAntDesign = false,
    importAntDesignMobile = false,
    importMaterialUi = false,
  } = options;

  // Initial babel presets
  const presets = [
    require('@babel/preset-env'),
    {
      debug,
      targets,
      modules,
      useBuiltIns,
      corejs: 3,
      bugfixes: true,
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
  ];

  // Initial babel plugins
  const plugins = [
    [require('@babel/plugin-proposal-decorators'), { decoratorsBeforeExport: true }],
    [require('@babel/plugin-proposal-class-properties'), { loose: true }],
    [require('@babel/plugin-proposal-logical-assignment-operators'), {}],
    [require('@babel/plugin-proposal-nullish-coalescing-operator'), { loose: true }],
    [require('@babel/plugin-proposal-numeric-separator'), {}],
    [require('@babel/plugin-proposal-optional-chaining'), { loose: true }],
    [require('@babel/plugin-proposal-private-methods'), { loose: true }],
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

  // Optimize ant-design import
  if (importAntDesign) {
    plugins.concat([
      [
        require.resolve('babel-plugin-import'),
        {
          libraryName: 'antd',
          libraryDirectory: modules === false ? 'es' : 'lib',
          style: true,
        },
        'antd',
      ],
      [
        require.resolve('babel-plugin-import'),
        {
          libraryName: '@ant-design/icons',
          libraryDirectory: modules === false ? 'es/icons' : '',
          camel2DashComponentName: false,
        },
        '@ant-design/icons',
      ],
    ]);
  }

  // Optimize ant-design-mobile import
  if (importAntDesignMobile) {
    plugins.concat([
      [
        require.resolve('babel-plugin-import'),
        {
          libraryName: 'antd-mobile',
          libraryDirectory: modules === false ? 'es' : 'lib',
          style: true,
        },
        'antd-mobile',
      ],
      [
        require.resolve('babel-plugin-import'),
        {
          libraryName: '@ant-design/icons',
          libraryDirectory: modules === false ? 'es/icons' : '',
          camel2DashComponentName: false,
        },
        '@ant-design/icons',
      ],
    ]);
  }

  // Optimize material-ui import
  if (importMaterialUi) {
    plugins.concat([
      [
        require.resolve('babel-plugin-import'),
        {
          libraryName: '@material-ui/core',
          libraryDirectory: modules === false ? 'esm' : '',
          camel2DashComponentName: false,
        },
        '@material-ui/core',
      ],
      [
        'babel-plugin-import',
        {
          libraryName: '@material-ui/icons',
          libraryDirectory: modules === false ? 'esm' : '',
          camel2DashComponentName: false,
        },
        '@material-ui/icons',
      ],
      [
        'babel-plugin-import',
        {
          libraryName: '@material-ui/lab',
          libraryDirectory: modules === false ? 'esm' : '',
          camel2DashComponentName: false,
        },
        '@material-ui/lab',
      ],
      [
        'babel-plugin-import',
        {
          libraryName: '@material-ui/pickers',
          libraryDirectory: modules === false ? 'esm' : '',
          camel2DashComponentName: false,
        },
        '@material-ui/pickers',
      ],
    ]);
  }

  // Add react preset and plugins
  if (react) {
    presets.push([
      require('@babel/preset-react'),
      {
        useBuiltIns: true,
        development: isDev,
      },
    ]);

    if (isDev) {
      plugins.push([
        require('babel-plugin-transform-react-remove-prop-types'),
        {
          mode: 'remove',
          removeImport: true,
        },
      ]);
    } else {
      plugins.push([require('@babel/plugin-transform-react-constant-elements'), {}]);
      plugins.push([require('@babel/plugin-transform-react-inline-elements'), {}]);
    }
  }

  // Add typescript preset and plugins
  if (typescript) {
    presets.push([
      require('@babel/preset-typescript'),
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
