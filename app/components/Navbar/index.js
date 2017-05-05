/* @flow */

import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.css';

export const Navbar = () => (
  <div className={styles.navbar}>
    <Link to="/blog">index</Link>
    <Link to="/">discuss</Link>
  </div>
);
