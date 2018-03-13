/* @flow */

import * as React from 'react';

import styles from './styles.css';

type $Props = {|
  children?: React.Node,
|};

export const Highlight = ({ children }: $Props) => (
  <div className={styles.highlight}>{children}</div>
);
