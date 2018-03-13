/* @flow */

import * as React from 'react';

import styles from './styles.css';

type $Props = {| children?: React.Node |};

export const H3 = ({ children }: $Props) => (
  <h3 className={styles.h3}>{children}</h3>
);
