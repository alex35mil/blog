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

export const Header = ({ cover, credit, children }: $Props) => (
  <header
    className={cn(styles.header, { [styles.cover]: cover })}
    style={
      cover && {
        backgroundImage: `url(${cover})`,
      }
    }
  >
    {cover && <div className={styles.overlay} />}
    <div className={styles.title}>
      {children}
    </div>
    {credit &&
      <div className={styles.credit}>
        Artwork: <A unstyled href={credit.url} targetBlank>{credit.author}</A>
      </div>}
  </header>
);
