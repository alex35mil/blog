/* @flow */

import React from 'react';

import type { $PostProps } from 'app/shell/types';

import { Header, Navbar, H1 } from 'app/components';

import styles from './styles.css';

type $Props = $PostProps & {
  // ...$PostProps,
  children?: React.Element<*>,
};

export const Post = ({ title, date, children: post }: $Props) => (
  <section className={styles.post}>
    <Header>
      <H1>{title}</H1>
    </Header>
    <Navbar date={date} />
    {post}
  </section>
);
