/* @flow */
/* eslint-disable global-require, import/no-unresolved */

import { locations } from 'config';

type $ModuleId = string;
type $ChunkId = string;

export const getChunks = (modules: Array<$ModuleId>): Array<$ChunkId> => {
  // $FlowIgnoreMe: manifest is built by webpack
  const manifest = require('../../../../public/assets/modules.manifest.json');
  const chunks = new Set();

  modules.forEach((moduleId) => {
    const moduleChunks = manifest.find(module => module.id === moduleId).chunks;
    moduleChunks.forEach(chunkId => chunks.add(chunkId));
  });

  return Array.from(chunks);
};

export const getAsset = (asset: string): string => {
  if (__DEV__) {
    return `${locations.hotServerUrl}${locations.assetsPublicPath}${asset}`;
  }
  // $FlowIgnoreMe: manifest is built by webpack
  const manifest = require('../../../../public/assets/assets.manifest.json');
  return `${locations.assetsPublicPath}${manifest[asset]}`;
};
