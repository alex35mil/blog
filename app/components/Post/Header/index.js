/* @flow */

import * as React from 'react';
import cn from 'classnames';

import styles from './styles.css';

type $Props = {|
  withCover: boolean,
  children?: React.Node,
|};

export const Header = ({ withCover, children }: $Props) => (
  <header
    className={cn(
      styles.header,
      withCover ? styles.headerWithCover : styles.headerWithoutCover,
    )}
  >
    <div className={styles.title}>{children}</div>
  </header>
);
