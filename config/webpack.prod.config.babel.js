/* @flow */

import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import GzipPlugin from 'compression-webpack-plugin';

import { locations, modules } from './index';

export default {
  entry: {
    app: './app/shell/client/prod',
  },

  output: {
    path: locations.assetsServerPath,
    publicPath: locations.assetsPublicPath,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[id]-[chunkhash].js',
  },

  performance: { hints: 'warning' },

  context: locations.root,
  resolve: { extensions: ['.js'] },
  devtool: false,

  module: {
    noParse: modules.minifiedJs,
    rules: [
      {
        test: modules.jsModule,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            forceEnv: 'client:prod',
            cacheDirectory: true,
          },
        },
      },
      {
        test: modules.cssModule,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
              },
            },
            'postcss-loader',
          ],
        }),
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin({
      filename: '[name]-[chunkhash].css',
      allChunks: true,
    }),
    new ManifestPlugin({ fileName: 'manifest.json' }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
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
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        drop_debugger: true,
        drop_console: true,
        screw_ie8: true,
        warnings: false,
      },
    }),
    new GzipPlugin({
      asset: '[path].gz',
      algorithm: 'gzip',
      regExp: /\.js$|\.css$/,
    }),
    new webpack.LoaderOptionsPlugin({
      debug: false,
      minimize: true,
      progress: true,
      options: { context: locations.root },
    }),
  ],
};
