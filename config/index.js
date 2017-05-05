/* @noflow */

import path from 'path';

export const HOSTNAME = process.env.HOSTNAME;
export const WEB_PORT = parseInt(process.env.WEB_PORT, 10);
export const HOT_PORT = parseInt(process.env.HOT_PORT, 10);

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

  devFilename: '[name]',
  devChunkFilename: '[id]',
  prodFilename: '[name].[chunkhash]',
  prodChunkFilename: '[id].[chunkhash]',

  devCssModuleClassName: '[path]__[local]__[hash:base64:5]',
  prodCssModuleClassName: '[hash:base64]',

  modulesManifestFilename: 'modules.manifest.json',
  assetsManifestFilename: 'assets.manifest.json',
};
