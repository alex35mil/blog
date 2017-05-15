/* @flow */
/* eslint-disable prefer-template, no-use-before-define, consistent-return */

import path from 'path';
import loaderUtils from 'loader-utils';

const FLUID = 'fluid';
const FIXED = 'fixed';

export default function pictureLoader<S>(source: S): S {
  return source;
}

export function pitch(request: string) {
  // No preset is defined, skipping
  if (!this.resourceQuery) return;

  const query = loaderUtils.parseQuery(this.resourceQuery);
  const options = loaderUtils.getOptions(this);

  if (!Object.keys(options.presets).includes(query.preset)) {
    throw new Error(`[picture-loader]: Unknown preset "${query.preset}"`);
  }

  const preset = options.presets[query.preset];

  if (!preset.type) {
    throw new Error(`[picture-loader]: Preset type is required`);
  }

  if (preset.type !== FLUID && preset.type !== FIXED) {
    throw new Error(`[picture-loader]: Unknown preset type "${preset.type}"`);
  }

  if (!preset.fallback) {
    throw new Error(`[picture-loader]: Fallback size is required`);
  }

  const sources = preset.sizes.reduce(
    (dict, size) => ({
      ...dict,
      [size]: getRequire(request, size),
      [size * 2]: getRequire(request, size * 2),
    }),
    {},
  );
  const fallback = sources[preset.fallback];

  return preset.type === FLUID
    ? exportFluid(preset, sources, fallback)
    : exportFixed(preset, sources, fallback);
}

function getRequire(request, size) {
  const parsedRequest = request.split('!');
  const resizeLoader = path.join(__dirname, 'resize-loader.js');
  const loaders = parsedRequest.slice(0, -1).concat(`${resizeLoader}?size=${size}`);
  const image = parsedRequest[parsedRequest.length - 1];
  const resizedImage = '-!' + loaders.concat(image).join('!');
  return `require(${JSON.stringify(resizedImage)})`;
}

function exportFluid(preset, sources, fallback) {
  const stringifiedSrcset = Object.keys(sources).map(size => `${sources[size]} + ' ${size}w'`)
    .join(`+ ', ' + `);

  return `module.exports = { srcset: ${stringifiedSrcset}, fallback: ${fallback} }`;
}

function exportFixed(preset, sources, fallback) {
  const srcsets = preset.sizes.reduce(
    (dict, size) => ({
      ...dict,
      [size]: `${sources[size]} + ', ' + ${sources[size * 2]} + ' 2x'`,
    }),
    {},
  );
  const stringifiedSrcsets = preset.sizes.map(size => `${size}: ${srcsets[size]}`).join(', ');
  return `module.exports = { ${stringifiedSrcsets}, fallback: ${fallback} }`;
}
