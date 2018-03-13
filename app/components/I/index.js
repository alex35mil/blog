/* @flow */

import * as React from 'react';

import styles from './styles.css';

type $Props = {| children?: React.Node |};

export const I = ({ children }: $Props) => (
  <i className={styles.italic}>{children}</i>
);
