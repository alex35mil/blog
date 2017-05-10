/* @flow */

import React from 'react';

// import type { $PostProps } from 'app/shell/types';

import { H1 } from 'app/components';
import { Header } from './Header';
import { Navbar } from './Navbar';
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
  <section className={styles.post}>
    <Header cover={cover} credit={credit}>
      <H1>{title}</H1>
    </Header>
    <Navbar year={year} date={date} />
    {post}
    <Footer copyright={copyright} />
  </section>
);
