/* @flow */

import React from 'react';

import styles from './styles.css';

type $Props = {| children?: React.Element<*> |};

export const I = ({ children }: $Props) =>
  <i className={styles.italic}>
    {children}
  </i>;
