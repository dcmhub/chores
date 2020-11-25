const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = (
  env,
  argv,
  {
    NAME = 'index',
    MAIN = 'index.js',
    ENTRY,
    TARGET = 'web',
    LIBRARY_TARGET = 'umd',
    SRC_DIR,
    DIST_DIR,
    CODECS_DIR,
    DEVTOOL,
    PUBLIC_PATH = process.env.PUBLIC_URL || '/',
    EXTERNALS = {},
    ESM_ENABLED = true,
    BYTE_LIMIT = 2048,
  },
) => {
  const { mode = 'development' } = argv;
  const isProd = mode === 'production';

  const webpackConfig = {
    mode,
    target: TARGET,
    cache: true,
    context: SRC_DIR,
    devtool: DEVTOOL ?? isProd ? 'source-map' : 'cheap-module-eval-source-map',
    externals: EXTERNALS,

    entry: ENTRY || {
      [NAME]: path.join(SRC_DIR, MAIN),
    },

    output: {
      path: DIST_DIR,
      library: '[name]',
      libraryTarget: LIBRARY_TARGET,
      umdNamedDefine: LIBRARY_TARGET === 'umd',
      filename: isProd ? '[name].min.js' : '[name].js',
      publicPath: isProd ? PUBLIC_PATH : '',
      pathinfo: !isProd,
    },

    optimization: {
      minimize: isProd,
      sideEffects: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          extractComments: false,
        }),
      ],
    },

    resolve: {
      extensions: ['.js', '.mjs', '.ts', '.jsx', '.tsx', '.json', '.wasm'],
      mainFields: ['module', 'main'],
      modules: [SRC_DIR, path.resolve(__dirname, '..', '..')],
    },

    module: {
      noParse: /codecs/,
      rules: [
        {
          test: /\.(jsx?|tsx?|mjs)$/,
          loader: 'babel-loader',
          exclude: /(node_modules|codecs)/,
          options: {
            envName: mode,
            cacheCompression: !isProd,
            cacheDirectory: !isProd,
          },
        },
        {
          test: /\.worker\.js$/,
          loader: 'worker-loader',
          exclude: /(node_modules|codecs)/,
          options: {
            inline: 'no-fallback',
            esModule: ESM_ENABLED,
          },
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: ESM_ENABLED,
              },
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                esModule: ESM_ENABLED,
                modules: {
                  localIdentName: isProd ? '[hash:base64:8]' : '[path]_[name]__[local]',
                },
              },
            },
            {
              loader: 'postcss-loader',
            },
          ],
        },
        {
          test: /\.(ico|gif|png|jpg|jpeg|bmp|tiff|webp|avif|mp3|mp4)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: BYTE_LIMIT,
              },
            },
          ],
        },
      ].concat(
        CODECS_DIR
          ? [
              {
                loader: 'exports-loader',
                test: path.join(CODECS_DIR, 'openJPEG-FixedMemory.js'),
                options: {
                  type: 'commonjs',
                  exports: 'OpenJPEG',
                },
              },
              {
                loader: 'exports-loader',
                test: path.join(CODECS_DIR, 'charLS-FixedMemory-browser.js'),
                options: {
                  type: 'commonjs',
                  exports: 'CharLS',
                },
              },
              {
                loader: 'exports-loader',
                test: path.join(CODECS_DIR, 'jpeg.js'),
                options: {
                  type: 'commonjs',
                  exports: 'JpegImage',
                },
              },
              {
                loader: 'exports-loader',
                test: path.join(CODECS_DIR, 'jpx.min.js'),
                options: {
                  type: 'commonjs',
                  exports: 'JpxImage',
                },
              },
            ]
          : [],
      ),
    },

    plugins: [
      new webpack.ProgressPlugin(),

      new webpack.EnvironmentPlugin({
        NODE_ENV: mode,
      }),

      new webpack.DefinePlugin({
        PUBLIC_URL: JSON.stringify(process.env.PUBLIC_URL || '/'),
        REACT_APP_ENV: JSON.stringify(mode),
      }),

      new MiniCssExtractPlugin({
        filename: isProd ? '[name].min.css' : '[name].css',
        chunkFilename: isProd ? '[id].min.css' : '[id].css',
      }),
    ],

    experiments: {
      asyncWebAssembly: true,
      topLevelAwait: true,
    },
  };

  return webpackConfig;
};
