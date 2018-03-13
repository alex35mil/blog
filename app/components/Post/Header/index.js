/* @flow */

import * as React from 'react';

import styles from './styles.css';

type $Props = {| children?: React.Node |};

export const Header = ({ children }: $Props) => (
  <header className={styles.header}>
    <div className={styles.title}>{children}</div>
  </header>
);
