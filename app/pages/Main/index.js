/* @flow */

import React from 'react';
import cn from 'classnames';

import { Link, ProgressBar } from 'app/components';
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
            <Link to="/blog" className={cn(styles.link, styles.blogLink)}>
              blog
            </Link>
            <hr width="1" size="30" className={styles.sep} />
            <Link
              native
              targetBlank
              to="https://twitter.com/alexfedoseev"
              className={cn(styles.link, styles.iconLink, styles.twitter)}
            >
              <Icon.Twitter />
            </Link>
            <Link
              native
              targetBlank
              to="https://www.facebook.com/alex.fedoseev"
              className={cn(styles.link, styles.iconLink, styles.facebook)}
            >
              <Icon.Facebook />
            </Link>
            <Link
              native
              targetBlank
              to="https://github.com/alexfedoseev"
              className={cn(styles.link, styles.iconLink, styles.github)}
            >
              <Icon.Github />
            </Link>
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
