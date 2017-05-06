/* @flow */

import React from 'react';
import { Link } from 'react-router-dom';

import * as Icon from 'app/components/Svg/icons';

import styles from './styles.css';

type $Props = {| date: string |};

export const Navbar = ({ date }: $Props) => (
  <div className={styles.navbar}>
    <div className={styles.leftSide}>
      <Link to="/" className={styles.link}>
        <Icon.Home />
      </Link>
      <Link to="/blog" className={styles.link}>
        <Icon.Posts />
      </Link>
    </div>
    <div className={styles.center}>{date}</div>
    <div className={styles.rightSide}>
      <Link to="/" className={styles.link}>
        <Icon.Discuss />
      </Link>
      <Link to="/" className={styles.link}>
        <Icon.Share />
      </Link>
    </div>
  </div>
);
