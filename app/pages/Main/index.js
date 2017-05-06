/* @flow */

import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { ProgressBar } from 'app/components';
import * as Icon from 'app/components/Svg/icons';
import withPageMeta from 'app/shell/withPageMeta';

import styles from './styles.css';

const Main = () => (
  <ProgressBar.Done>
    <section className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.photo} />
        <div className={styles.text}>
          <div className={styles.logo}>
            alex.fedoseev
          </div>
          <div className={styles.links}>
            <Link to="/blog" className={styles.item}>blog</Link>
            <hr width="1" size="30" className={styles.sep} />
            <a href="https://twitter.com/alexfedoseev" className={cn(styles.item, styles.twitter)}>
              <Icon.Twitter />
            </a>
            <a
              href="https://www.facebook.com/alex.fedoseev"
              className={cn(styles.item, styles.facebook)}
            >
              <Icon.Facebook />
            </a>
            <a href="https://github.com/alexfedoseev" className={cn(styles.item, styles.github)}>
              <Icon.Github />
            </a>
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
