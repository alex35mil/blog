/* @flow */

import React from 'react';
import { Link } from 'react-router-dom';

import { ProgressBar } from 'app/components';
import withPageMeta from 'app/shell/withPageMeta';

import styles from './styles.css';

const Main = () => (
  <ProgressBar.Done>
    <section className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.photo} />
        <div className={styles.text}>
          <div className={styles.title}>
            alex.fedoseev
          </div>
          <div className={styles.links}>
            <Link to="/blog">blog</Link> | t f g
          </div>
        </div>
      </div>
    </section>
  </ProgressBar.Done>
);

export default withPageMeta(Main, {
  type: 'profile',
  title: 'main',
  description: 'Main page description',
});
