/* @flow */

import React from 'react';
import cn from 'classnames';

import { routes } from 'app/shell/routes';

import { Page, A } from 'app/components';
import * as Icon from 'app/components/Svg/icons';
import withPageMeta from 'app/shell/withPageMeta';

import styles from './styles.css';

const Main = () => (
  <Page>
    <section className={styles.section}>
      <div className={styles.hero}>
        <div className={styles.photo} />
        <div className={styles.text}>
          <div className={styles.logo}>
            alex.fedoseev
          </div>
          <div className={styles.links}>
            <A internal unstyled href={routes.blog()} className={cn(styles.link, styles.blogLink)}>
              blog
            </A>
            <hr width="1" size="30" className={styles.sep} />
            <A
              unstyled
              href="https://twitter.com/alexfedoseev"
              targetBlank
              className={cn(styles.link, styles.iconLink, styles.twitter)}
            >
              <Icon.Twitter />
            </A>
            <A
              unstyled
              href="https://www.facebook.com/alex.fedoseev"
              targetBlank
              className={cn(styles.link, styles.iconLink, styles.facebook)}
            >
              <Icon.Facebook />
            </A>
            <A
              unstyled
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
  </Page>
);

export default withPageMeta(Main, {
  type: 'profile',
  title: 'main',
  description: `Hey, I'm a frontend engineer focused on UIs, JS, React, Node & CSS. Hi!`,
});
