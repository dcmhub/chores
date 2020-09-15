module.exports = {
  presets: [
    [
      './index.js',
      {
        react: true,
        typescript: true,
        alias: true,
      },
    ],
  ],

  // Templates for babel-plugin-import usage
  plugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
    [
      'import',
      {
        libraryName: '@ant-design/icons',
        libraryDirectory: 'es/icons',
        camel2DashComponentName: false,
      },
      '@ant-design/icons',
    ],
    [
      'import',
      {
        libraryName: 'antd-mobile',
        libraryDirectory: 'es',
        style: true,
      },
      'antd-mobile',
    ],
    [
      'import',
      {
        libraryName: '@material-ui/core',
        libraryDirectory: 'esm',
        camel2DashComponentName: false,
      },
      '@material-ui/core',
    ],
    [
      'import',
      {
        libraryName: '@material-ui/icons',
        libraryDirectory: 'esm',
        camel2DashComponentName: false,
      },
      '@material-ui/icons',
    ],
    [
      'import',
      {
        libraryName: '@material-ui/lab',
        libraryDirectory: 'esm',
        camel2DashComponentName: false,
      },
      '@material-ui/lab',
    ],
    [
      'import',
      {
        libraryName: '@material-ui/pickers',
        libraryDirectory: 'esm',
        camel2DashComponentName: false,
      },
      '@material-ui/pickers',
    ],
  ],
};
