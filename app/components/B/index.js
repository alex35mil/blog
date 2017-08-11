/* @flow */

import React from 'react';

import styles from './styles.css';

type $Props = {| children?: React.Element<*> |};

export const B = ({ children }: $Props) =>
  <strong className={styles.strong}>
    {children}
  </strong>;
