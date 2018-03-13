/* @flow */

import * as React from 'react';

import styles from './styles.css';

type $Props = {| children?: React.Node |};

// Not `Code` to make it shorter
export const C = ({ children }: $Props) => (
  <code className={styles.code}>{children}</code>
);
