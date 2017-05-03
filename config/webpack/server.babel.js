/* @flow */

import webpack from 'webpack';
import getNodeExternals from 'webpack-node-externals';

import { locations, modules } from '../index';

const isDevelopment = process.env.NODE_ENV !== 'production';

export default {
  entry: { app: './server' },

  output: {
    path: locations.serverBuildPath,
    filename: '[name].js',
    libraryTarget: 'commonjs',
  },

  target: 'node',
  externals: [
    // 'react-loadable' is stateful and must be included in the build
    // to handle SSR + code splitting properly
    getNodeExternals({ whitelist: ['react-loadable'] }),
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
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.DefinePlugin({ __DEV__: isDevelopment }),
    new webpack.LoaderOptionsPlugin({
      debug: false,
      minimize: false,
      progress: true,
      options: { context: locations.root },
    }),
  ],
};
