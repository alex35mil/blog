/* @flow */

import webpack from 'webpack';
import getNodeExternals from 'webpack-node-externals';

import { locations, modules } from '../index';

const isDevelopment = process.env.NODE_ENV !== 'production';

export default {
  entry: { app: './server' },

  output: {
    path: locations.buildPath,
    filename: '[name].js',
    libraryTarget: 'commonjs',
    publicPath: isDevelopment
      ? `${locations.hotServerUrl}${locations.assetsPublicUrl}`
      : locations.assetsPublicUrl,
  },

  target: 'node',
  externals: [
    // 'react-loadable' is stateful and must be included in the build
    // to handle SSR + code splitting properly.
    // Also, we don't want requiring external css on the server.
    getNodeExternals({
      whitelist: ['react-loadable', /.*\.css$/],
    }),
  ],
  node: {
    __dirname: true,
    __filename: true,
  },

  context: locations.root,
  resolve: { extensions: ['.js'] },
  devtool: '#sourcemap',

  module: {
    noParse: modules.minifiedJs,
    rules: [
      {
        test: modules.jsModule,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            forceEnv: 'server',
            cacheDirectory: true,
          },
        },
      },
      {
        test: modules.cssModule,
        exclude: /node_modules/,
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: isDevelopment
                ? modules.devCssModuleClassName
                : modules.prodCssModuleClassName,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: modules.cssModule,
        include: /node_modules/,
        use: 'css-loader/locals',
      },
      {
        test: modules.image,
        use: {
          loader: 'file-loader',
          options: {
            name: modules.assetFilename,
            emitFile: false,
          },
        },
      },
      {
        test: modules.animatedGif,
        use: {
          loader: 'file-loader',
          options: {
            name: modules.assetFilename,
            emitFile: false,
          },
        },
      },
    ],
  },

  plugins: [
    // required to have consistend module ids
    new webpack.HashedModuleIdsPlugin(),
    // server build must be compiled as a single bundle
    // to perform chunks rendering synchronously
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),
    new webpack.DefinePlugin({ __DEV__: isDevelopment }),
    new webpack.LoaderOptionsPlugin({
      debug: false,
      minimize: false,
      progress: true,
      options: { context: locations.root },
    }),
  ],
};
