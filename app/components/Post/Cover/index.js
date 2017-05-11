/* @flow */

import React from 'react';

import { A } from 'app/components';

import styles from './styles.css';

type $Props = {|
  cover?: string,
  credit?: {|
    author: string,
    url: string,
  |},
|};

export const Cover = ({ cover, credit }: $Props) => (
  <div className={styles.cover} style={cover && { backgroundImage: `url(${cover})` }}>
    {cover && <div className={styles.overlay} />}
    {credit &&
      <div className={styles.credit}>
        Artwork: <A unstyled href={credit.url} targetBlank>{credit.author}</A>
      </div>}
  </div>
);
