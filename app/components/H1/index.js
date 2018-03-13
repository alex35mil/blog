/* @flow */

import * as React from 'react';

import styles from './styles.css';

type $Props = {| children?: React.Node |};

export const H1 = ({ children }: $Props) => (
  <h1 className={styles.h1}>{children}</h1>
);
