/* @flow */

import React from 'react';

import styles from './styles.css';

type $Props = {| children?: React.Element<*> |};

export const H1 = ({ children }: $Props) => (
  <h1 className={styles.h1}>
    {children}
  </h1>
);
