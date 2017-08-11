/* @flow */

import React from 'react';

import styles from './styles.css';

type $Props = {| children?: React.Element<*> |};

export const Header = ({ children }: $Props) =>
  <header className={styles.header}>
    <div className={styles.title}>
      {children}
    </div>
  </header>;
