import path from 'path';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';

export default (
  env,
  argv,
  {
    NAME = 'index',
    MAIN = 'index.js',
    ENTRY,
    SRC_DIR,
    DIST_DIR,
    CODECS_DIR,
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
    target: 'web',
    cache: true,
    context: SRC_DIR,
    devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',
    externals: EXTERNALS,

    entry: ENTRY || {
      [NAME]: path.join(SRC_DIR, MAIN),
    },

    output: {
      path: DIST_DIR,
      library: '[name]',
      libraryTarget: 'umd',
      umdNamedDefine: true,
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
        new OptimizeCSSAssetsPlugin(),
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
          exclude: /(node_modules|codecs|\.worker\.js$)/,
          options: {
            envName: mode,
            cacheDirectory: !isProd,
          },
        },
        {
          test: /\.worker\.js$/,
          exclude: /(node_modules|codecs)/,
          use: [
            {
              loader: 'worker-loader',
              options: {
                inline: 'fallback',
                esModule: ESM_ENABLED,
              },
            },
            {
              loader: 'babel-loader',
              options: {
                envName: mode,
                cacheCompression: !isProd,
                cacheDirectory: !isProd,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: !isProd,
                reloadAll: true,
                esModule: ESM_ENABLED,
                modules: {
                  namedExport: ESM_ENABLED,
                },
              },
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                esModule: ESM_ENABLED,
                modules: {
                  namedExport: ESM_ENABLED,
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

    node: {
      fs: 'empty',
    },
  };

  return webpackConfig;
};
