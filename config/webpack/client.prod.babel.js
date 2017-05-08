/* @flow */

import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import GzipPlugin from 'compression-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

import AssetsManifestPlugin from './plugins/AssetsManifestPlugin';
import ModulesManifestPlugin from './plugins/ModulesManifestPlugin';

import { locations, modules } from '../index';

const appStyles = new ExtractTextPlugin({
  filename: 'app.[contenthash].css',
  allChunks: true,
});

const vendorStyles = new ExtractTextPlugin({
  filename: 'vendor.[contenthash].css',
  allChunks: true,
});

export default {
  entry: {
    app: './app/shell/client/start.prod',
  },

  output: {
    path: locations.assetsPath,
    publicPath: locations.assetsPublicUrl,
    filename: `${modules.prodFilename}.js`,
    chunkFilename: `${modules.prodChunkFilename}.js`,
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
        exclude: /node_modules/,
        use: appStyles.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: modules.prodCssModuleClassName,
              },
            },
            'postcss-loader',
          ],
        }),
      },
      {
        test: modules.cssModule,
        include: /node_modules/,
        use: vendorStyles.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: modules.image,
        loader: 'url-loader',
        options: {
          limit: modules.assetInlineLimit,
          name: modules.assetFilename,
        },
      },
      {
        test: modules.animatedGif,
        loader: 'file-loader',
        options: {
          name: modules.assetFilename,
        },
      },
    ],
  },

  plugins: [
    appStyles,
    vendorStyles,
    // required to have consistend module ids
    new webpack.HashedModuleIdsPlugin(),
    new AssetsManifestPlugin({
      path: locations.assetsPath,
      filename: modules.assetsManifestFilename,
    }),
    new ModulesManifestPlugin({
      path: locations.assetsPath,
      filename: modules.modulesManifestFilename,
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.DefinePlugin({ __DEV__: false }),
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      // NB: Doesn't work, b/c this additional chunk must be sent to the client
      //     along w/ rendered post chunk. It might be possible to track it down
      //     in context of specific app, but it doesn't worth it for _this_ app.
      // async: true,
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
    new CopyPlugin([
      // favicon.ico
      {
        from: path.resolve(locations.root, 'app', 'styles', 'assets', 'favicon.ico'),
        to: locations.publicPath,
      },
    ]),
    new webpack.LoaderOptionsPlugin({
      debug: false,
      minimize: true,
      progress: true,
      options: { context: locations.root },
    }),
  ],
};
