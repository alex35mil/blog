/* @flow */

import React from 'react';

// import type { $PostProps } from 'app/shell/types';

import { H1 } from 'app/components';
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
  copyright: {|
    start: string,
    end: string,
  |},
  // ...$PostProps,
  cover?: string,
  credit?: {|
    author: string,
    url: string,
  |},
  children?: React.Element<*>,
};

export const Post = ({ title, year, date, cover, credit, copyright, children: post }: $Props) => (
  <section className={styles.section}>
    <Cover cover={cover} credit={credit} />
    <Header>
      <H1>{title}</H1>
    </Header>
    <Navbar year={year} date={date} />
    <div className={styles.post}>
      {post}
    </div>
    <SocialSharing />
    <Footer copyright={copyright} />
  </section>
);
