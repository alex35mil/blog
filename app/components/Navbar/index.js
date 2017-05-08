/* @flow */

import React from 'react';

import { routes } from 'app/shell/routes';

import { A } from 'app/components';
import * as Icon from 'app/components/Svg/icons';

import styles from './styles.css';

type $Props = {|
  year: string,
  date: string,
|};

export const Navbar = ({ year, date }: $Props) => (
  <div className={styles.navbar}>
    <div className={styles.leftSide}>
      <A internal href="/" className={styles.link}>
        <Icon.Home />
      </A>
    </div>
    <div className={styles.center}>{date}, {year}</div>
    <div className={styles.rightSide}>
      <A internal href={routes.blog()} className={styles.link}>
        <Icon.Posts />
      </A>
      <A internal href="/" className={styles.link}>
        <Icon.Discuss />
      </A>
      <A internal href="/" className={styles.link}>
        <Icon.Share />
      </A>
    </div>
  </div>
);
