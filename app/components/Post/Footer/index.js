/* @flow */

import React from 'react';
import cn from 'classnames';

import { A } from 'app/components';
import * as Icon from 'app/components/Svg/icons';

import styles from './styles.css';

type $Props = {|
  copyright: {|
    start: string,
    end: string,
  |},
|};

export const Footer = ({ copyright }: $Props) => (
  <div className={styles.footer}>
    <div className={styles.index}>
      <A internal href="" className={styles.indexLink}>Home</A>
      <A internal href="/blog" className={styles.indexLink}>Blog</A>
    </div>
    <div className={styles.src}>
      <Icon.Sources className={styles.srcIcon} />
      <A
        unstyled
        href="https://github.com/alexfedoseev/blog"
        targetBlank
        className={styles.srcLink}
      >
        sources
      </A>
    </div>
    <div className={styles.copy}>
      © {copyright.start}–{copyright.end} alex.fedoseev
    </div>
    <div className={styles.socials}>
      <A
        unstyled
        href="https://twitter.com/alexfedoseev"
        targetBlank
        className={cn(styles.socialLink, styles.twitter)}
      >
        <Icon.Twitter />
      </A>
      <A
        unstyled
        href="https://www.facebook.com/alex.fedoseev"
        targetBlank
        className={cn(styles.socialLink, styles.facebook)}
      >
        <Icon.Facebook />
      </A>
      <A
        unstyled
        href="https://github.com/alexfedoseev"
        targetBlank
        className={cn(styles.socialLink, styles.github)}
      >
        <Icon.Github />
      </A>
      <A
        unstyled
        href="https://www.instagram.com/alex_kiddo"
        targetBlank
        className={cn(styles.socialLink, styles.instagram)}
      >
        <Icon.Instagram />
      </A>
      <A
        unstyled
        href="https://www.linkedin.com/in/alexfedoseev"
        targetBlank
        className={cn(styles.socialLink, styles.linkedin)}
      >
        <Icon.LinkedIn />
      </A>
    </div>
  </div>
);
