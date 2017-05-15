/* @flow */

import sharp from 'sharp';
import loaderUtils from 'loader-utils';

export const raw = true;

export default function resizeLoader(source: Buffer) {
  if (this.cacheable) this.cacheable();

  const next = this.async();
  const options = loaderUtils.getOptions(this);
  const width = parseInt(options.size, 10);

  sharp(source)
    .resize(width)
    .withoutEnlargement()
    .toBuffer()
    .then(image => next(null, image), error => next(error));
}
