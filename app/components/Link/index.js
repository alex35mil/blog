/* @flow */

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import cn from 'classnames';

import styles from './styles.css';

type $Props = {
  to: string,
  href?: void,
  native?: boolean,
  targetBlank?: boolean,
  className?: string,
  children?: React.Element<*>,
};

export const Link = ({ to, native, targetBlank, className, children, ...otherProps }: $Props) =>
  native
    ? <a
        {...otherProps}
        href={to}
        target={targetBlank && '_blank'}
        rel={targetBlank && 'noopener noreferrer'}
        className={cn(styles.link, className)}
      >
        {children}
      </a>
    : <RouterLink to={to} className={cn(styles.link, className)} {...otherProps}>
        {children}
      </RouterLink>;
