/* @flow */

import * as React from 'react';

import styles from './styles.css';

type $Props = {| children?: React.Node |};

export const Ul = ({ children }: $Props) => (
  <ul className={styles.list}>{children}</ul>
);

export const Ol = ({ children }: $Props) => (
  <ol className={styles.list}>{children}</ol>
);

export const Li = ({ children }: $Props) => (
  <li className={styles.item}>{children}</li>
);
