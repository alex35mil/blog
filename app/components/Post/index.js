/* @flow */

import * as React from 'react';

// import type { $PostProps } from 'app/shell/types';

import { Page, H1 } from 'app/components';
import { Header } from './Header';
import { Cover } from './Cover';
import { Navbar } from './Navbar';
import { SocialSharing } from './SocialSharing';
import { Footer } from './Footer';

import styles from './styles.css';

type $Props = {
  title: string,
  year: string,
  date: string,
  slug: string,
  shareLink: string,
  facebookAppId: string,
  copyright: {|
    start: string,
    end: string,
  |},
  // ...$PostProps,
  cover?: {|
    srcset: string,
    fallback: string,
  |},
  credit?: {|
    author: string,
    url: string,
  |},
  children?: React.Node,
};

export const Post = ({
  title,
  year,
  date,
  cover,
  credit,
  copyright,
  shareLink,
  facebookAppId,
  children: post,
}: $Props) => (
  <Page>
    <section className={styles.section}>
      <Cover cover={cover} credit={credit} />
      <Header withCover={!!cover}>
        <H1>{title}</H1>
      </Header>
      <Navbar year={year} date={date} />
      <div className={styles.post}>{post}</div>
      <SocialSharing
        title={title}
        shareLink={shareLink}
        facebookAppId={facebookAppId}
      />
      <Footer copyright={copyright} />
    </section>
  </Page>
);
