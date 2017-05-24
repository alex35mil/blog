/* @noflow */

import path from 'path';

export const WEB_HOSTNAME = process.env.WEB_HOSTNAME;
export const HOT_HOSTNAME = process.env.HOT_HOSTNAME;
export const WEB_DOMAIN = `https://${WEB_HOSTNAME}`;
export const HOT_DOMAIN = `https://${HOT_HOSTNAME}`;
export const WEB_PORT = parseInt(process.env.WEB_PORT, 10);
export const HOT_PORT = parseInt(process.env.HOT_PORT, 10);
export const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;

const www = '/www';
const src = process.cwd();

export const locations = {
  src,
  public: path.join(www, 'public'),
  assets: path.join(www, 'public', 'assets'),
  serverBuild: path.join(src, 'build'),
  hotServerUrl: HOT_DOMAIN,
  assetsPublicUrl: '/assets/',
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
