/* @flow */

import React from 'react';
import cn from 'classnames';

import styles from './styles.css';

type $Props = {|
  type: 'center' | 'fill' | 'bleed',
  src: string,
  alt?: string,
  caption?: string,
|};

export const Image = ({ type, src, alt, caption }: $Props) => (
  <figure className={cn(styles.figure, styles[`type--${type}`])}>
    <img src={src} alt={alt || caption} />
    {caption && <figcaption>{caption}</figcaption>}
  </figure>
);
