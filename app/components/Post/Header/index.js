/* @flow */

import React from 'react';
import cn from 'classnames';

import { A } from 'app/components';

import styles from './styles.css';

type $Props = {|
  cover?: string,
  credit?: {|
    author: string,
    url: string,
  |},
  children?: React.Element<*>,
|};

export const Header = ({ credit, children }: $Props) => (
  <header className={styles.header}>
    <div className={styles.title}>
      {children}
    </div>
  </header>
);
