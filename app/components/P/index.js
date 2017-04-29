/* @flow */

import React from 'react';

import styles from './styles.css';

type $Props = {| children?: React.Element<*> |};

export const P = ({ children }: $Props) => (
  <p className={styles.paragraph}>
    {children}
  </p>
);
