/* @flow */

import * as React from 'react';

import styles from './styles.css';

type $Props = {| children?: React.Node |};

export const H2 = ({ children }: $Props) => (
  <h2 className={styles.h2}>{children}</h2>
);
