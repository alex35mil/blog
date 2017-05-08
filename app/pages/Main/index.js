/* @flow */

import React from 'react';
import cn from 'classnames';

import { routes } from 'app/shell/routes';

import { A, ProgressBar } from 'app/components';
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
            <A internal href={routes.blog()} className={cn(styles.link, styles.blogLink)}>
              blog
            </A>
            <hr width="1" size="30" className={styles.sep} />
            <A
              href="https://twitter.com/alexfedoseev"
              targetBlank
              className={cn(styles.link, styles.iconLink, styles.twitter)}
            >
              <Icon.Twitter />
            </A>
            <A
              href="https://www.facebook.com/alex.fedoseev"
              targetBlank
              className={cn(styles.link, styles.iconLink, styles.facebook)}
            >
              <Icon.Facebook />
            </A>
            <A
              href="https://github.com/alexfedoseev"
              targetBlank
              className={cn(styles.link, styles.iconLink, styles.github)}
            >
              <Icon.Github />
            </A>
          </div>
        </div>
      </div>
    </section>
  </ProgressBar.Done>
);

export default withPageMeta(Main, {
  type: 'profile',
  title: 'main',
  description: 'alex.fedoseev',
});
