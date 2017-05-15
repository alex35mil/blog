/* @flow */

import React from 'react';
import cn from 'classnames';

import type { $Placement } from './types';

import styles from './styles.css';

type $Props = {|
  src: {|
    '480': string,
    '910': string,
    fallback: string,
  |},
  placement: $Placement,
  alt?: string,
  caption?: string,
|};

export const Image = ({ src, placement, alt, caption }: $Props) => (
  <figure className={cn(styles.figure, styles[`placement--${placement}`])}>
    <picture>
      <source media="(max-width: 480px)" srcSet={src['480']} />
      <img src={src.fallback} srcSet={src['910']} alt={alt || caption} />
    </picture>
    {caption && <figcaption>{caption}</figcaption>}
  </figure>
);
