/* @flow */

import webpack from 'webpack';

import { locations, modules } from './index';

export default {
  entry: {
    app: [
      'react-hot-loader/patch',
      `webpack-hot-middleware/client?path=${locations.hotServerUrl}/__webpack_hmr`,
      './app/shell/client/dev',
    ],
  },

  output: {
    path: locations.assetsServerPath,
    publicPath: `${locations.hotServerUrl}${locations.assetsPublicPath}`,
    filename: '[name].js',
    chunkFilename: '[id].js',
  },

  context: locations.root,
  resolve: { extensions: ['.js'] },
  devtool: '#cheap-module-eval-source-map',

  module: {
    noParse: modules.minifiedJs,
    rules: [
      {
        test: modules.jsModule,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            forceEnv: 'client:dev',
            cacheDirectory: true,
          },
        },
      },
      {
        test: modules.cssModule,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[path]__[local]__[hash:base64:5]',
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.DefinePlugin({ __DEV__: true }),
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      async: true,
      minChunks: 2,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => module.context && module.context.indexOf('node_modules') !== -1,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      minimize: false,
      progress: true,
      options: { context: locations.root },
    }),
  ],
};
