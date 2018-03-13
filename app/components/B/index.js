/* @flow */

import * as React from 'react';

import styles from './styles.css';

type $Props = {| children?: React.Node |};

export const B = ({ children }: $Props) => (
  <strong className={styles.strong}>{children}</strong>
);
