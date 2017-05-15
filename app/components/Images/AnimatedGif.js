/* @flow */

import React from 'react';
import cn from 'classnames';

import type { $Placement } from './types';

import styles from './styles.css';

type $Props = {|
  src: string,
  placement: $Placement,
  alt?: string,
  caption?: string,
|};

export const AnimatedGif = ({ src, placement, alt, caption }: $Props) => (
  <figure className={cn(styles.figure, styles[`placement--${placement}`])}>
    <img src={src} alt={alt || caption} />
    {caption && <figcaption>{caption}</figcaption>}
  </figure>
);
