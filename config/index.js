/* @noflow */

import path from 'path';

export const PROTOCOL = process.env.SSL === 'off' ? 'http' : 'https';
export const HOSTNAME = process.env.HOSTNAME;
export const DOMAIN = `${PROTOCOL}://${HOSTNAME}`;
export const WEB_PORT = parseInt(process.env.WEB_PORT, 10);
export const HOT_PORT = parseInt(process.env.HOT_PORT, 10);
export const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;

export const locations = {
  root: process.cwd(),
  buildPath: path.join(process.cwd(), 'build'),
  publicPath: path.join(process.cwd(), 'public'),
  assetsPath: path.join(process.cwd(), 'public', 'assets'),
  assetsPublicUrl: '/assets/',
  hotServerUrl: `http://${HOSTNAME}:${HOT_PORT}`,
};

export const modules = {
  jsModule: /\.js$/,
  cssModule: /\.css$/,
  minifiedJs: /\.min\.js$/,
  image: [/\.jpe?g$/, /\.png$/],
  animatedGif: /\.gif$/,

  devFilename: '[name]',
  devChunkFilename: '[id]',
  prodFilename: '[name].[chunkhash]',
  prodChunkFilename: '[id].[chunkhash]',
  assetFilename: '[hash].[ext]',

  devCssModuleClassName: '[path]__[local]__[hash:base64:5]',
  prodCssModuleClassName: '[hash:base64]',

  modulesManifestFilename: 'modules.manifest.json',
  assetsManifestFilename: 'assets.manifest.json',

  assetInlineLimit: 10000,

  imagePresets: {
    cover: {
      type: 'fluid',
      sizes: [320, 480, 750, 1024, 1366, 1920, 2560],
      fallback: 1024,
    },
    inline: {
      type: 'fixed',
      sizes: [480, 910],
      fallback: 910,
    },
  },
};

export const loacalLoaders = {
  'picture-loader': path.join(__dirname, 'webpack', 'loaders', 'picture-loader'),
};
