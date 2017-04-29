/* @noflow */

import path from 'path';

export const HOSTNAME = process.env.HOSTNAME;
export const WEB_PORT = parseInt(process.env.WEB_PORT, 10);
export const HOT_PORT = parseInt(process.env.HOT_PORT, 10);

export const locations = {
  root: process.cwd(),
  assetsServerPath: path.join(process.cwd(), 'public', 'assets'),
  assetsPublicPath: '/assets/',
  hotServerUrl: `http://${HOSTNAME}:${HOT_PORT}`,
};

export const modules = {
  jsModule: /\.js$/,
  cssModule: /\.css$/,
  minifiedJs: /\.min\.js$/,
};
