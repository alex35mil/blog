/* @flow */

import React from 'react';

// import type { $PostProps } from 'app/shell/types';

import { Header, Navbar, H1 } from 'app/components';

import styles from './styles.css';

type $Props = {
  title: string,
  date: string,
  slug: string,
  // ...$PostProps,
  cover?: string,
  children?: React.Element<*>,
};

export const Post = ({ title, date, cover, children: post }: $Props) => (
  <section className={styles.post}>
    <Header cover={cover}>
      <H1>{title}</H1>
    </Header>
    <Navbar date={date} />
    {post}
  </section>
);
