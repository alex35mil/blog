/* @flow */

import React from 'react';

import styles from './styles.css';

type $Props = {|
  children?: React.Element<*>,
|};

export const Highlight = ({ children }: $Props) =>
  <highlight className={styles.highlight}>
    {children}
  </highlight>;
