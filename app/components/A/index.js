/* @flow */

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import cn from 'classnames';

import styles from './styles.css';

type $Props = {
  href: string,
  internal?: boolean,
  unstyled?: boolean,
  targetBlank?: boolean,
  className?: string,
  children?: React.Element<*>,
};

export const A = ({
  href,
  internal,
  unstyled,
  targetBlank,
  className,
  children,
  ...otherProps
}: $Props) =>
  internal
    ? <RouterLink to={href} className={cn({ [styles.link]: !unstyled }, className)} {...otherProps}>
        {children}
      </RouterLink>
    : <a
        {...otherProps}
        href={href}
        target={targetBlank && '_blank'}
        rel={targetBlank && 'noopener noreferrer'}
        className={cn({ [styles.link]: !unstyled }, className)}
      >
        {children}
      </a>;
