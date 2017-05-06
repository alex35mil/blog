/* @flow */

import React from 'react';
import cn from 'classnames';

import styles from './styles.css';

type $Props = {|
  cover?: string,
  children?: React.Element<*>,
|};

export const Header = ({ cover, children }: $Props) => (
  <header
    className={cn(styles.header, { [styles.cover]: cover })}
    style={
      cover && {
        backgroundImage: `url(${cover})`,
      }
    }
  >
    {cover && <div className={styles.overlay} />}
    {children}
  </header>
);
