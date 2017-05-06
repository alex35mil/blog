/* @flow */

import React from 'react';
import cn from 'classnames';

import styles from './styles.css';

type $Props = {
  title: string,
  className?: string,
  children?: React.Element<*>,
};

export const Svg = ({ title, className, children }: $Props) => (
  <svg
    className={cn(styles.svg, className)}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={`${title}-title`}
  >
    <title id={`icon-title-${title}`}>{title}</title>
    {children}
  </svg>
);
