/* @flow */

import React from 'react';
import cn from 'classnames';

import styles from './styles.css';

type $Props = {|
  title: string,
  viewBoxWidth?: number,
  viewBoxHeight?: number,
  className?: string,
  children?: React.Element<*>,
|};

export const Svg = ({
  title,
  viewBoxWidth = 16,
  viewBoxHeight = 16,
  className,
  children,
}: $Props) => (
  <svg
    className={cn(styles.svg, className)}
    viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={`${title}-title`}
  >
    <title id={`icon-title-${title}`}>{title}</title>
    {children}
  </svg>
);
