/* @flow */

import React from 'react';

// import type { $PostProps } from 'app/shell/types';

import { Header, Navbar, H1 } from 'app/components';

import styles from './styles.css';

type $Props = {
  title: string,
  year: string,
  date: string,
  slug: string,
  // ...$PostProps,
  cover?: string,
  children?: React.Element<*>,
};

export const Post = ({ title, year, date, cover, children: post }: $Props) => (
  <section className={styles.post}>
    <Header cover={cover}>
      <H1>{title}</H1>
    </Header>
    <Navbar year={year} date={date} />
    {post}
  </section>
);
