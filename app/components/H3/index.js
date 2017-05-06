/* @flow */

import React from 'react';

import styles from './styles.css';

type $Props = {| children?: React.Element<*> |};

export const H3 = ({ children }: $Props) => (
  <h3 className={styles.h3}>
    {children}
  </h3>
);
