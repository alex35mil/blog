/* @flow */

import { locations } from '../../../config';

export const getAsset = (name: string, type: string) =>
  // FlowIgnoreMe: defined by webpack
  // if (__DEV__) {
  `${locations.hotServerUrl}${locations.assetsPublicPath}${name}.${type}`
  // }
  /* eslint-disable global-require, import/no-unresolved */
  // FlowIgnoreMe: manifest is built by webpack
  // const manifest = require('../../../public/assets/manifest.json');
  // return `${locations.assetsPublicPath}${manifest[name]}.${type}`;
;
