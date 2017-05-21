/* @flow */
/* eslint-disable global-require, import/no-unresolved, import/no-absolute-path */

import { locations } from 'config';

type $ModuleId = string;
type $ChunkId = string;

export const getChunks = (modules: Array<$ModuleId>): Array<$ChunkId> => {
  // $FlowIgnoreMe: manifest is built by webpack
  const manifest = require('/www/public/assets/modules.manifest.json');
  const chunks = new Set();

  modules.forEach(moduleId => {
    const moduleChunks = manifest.find(module => module.id === moduleId).chunks;
    moduleChunks.forEach(chunkId => chunks.add(chunkId));
  });

  return Array.from(chunks);
};

export const getAsset = (asset: string): string => {
  if (__DEV__) {
    return `${locations.hotServerUrl}${locations.assetsPublicUrl}${asset}`;
  }
  // $FlowIgnoreMe: manifest is built by webpack
  const manifest = require('/www/public/assets/assets.manifest.json');
  return `${locations.assetsPublicUrl}${manifest[asset]}`;
};
