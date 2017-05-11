/* @flow */

import React from 'react';
import cn from 'classnames';

import { routes } from 'app/shell/routes';
import posts from 'app/shell/storage/posts.json';

import { A, ProgressBar } from 'app/components';
import withPageMeta from 'app/shell/withPageMeta';

import styles from './styles.css';

const years = Object.keys(posts).sort((a, b) => b - a);

const Blog = () => (
  <ProgressBar.Done>
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <A internal unstyled href="/" className={styles.link}>
              alex.fedoseev
            </A>
          </div>
          <div className={styles.blog}>
            blog
          </div>
        </div>
        {years.map(year => (
          <div key={year} className={styles.yearPosts}>
            {Object.keys(posts[year]).map((postId, index) => (
              <div key={postId} className={styles.post}>
                <div className={styles.year}>
                  {index === 0 && year}
                </div>
                <A
                  internal
                  unstyled
                  href={routes.post(year, postId)}
                  className={cn(styles.link, styles.postLink)}
                >
                  {posts[year][postId].title}
                </A>
              </div>
            ))}
          </div>
        ))}
        <div className={styles.footer}>
          <div className={styles.push} />
          <div className={styles.copy}>
            © {years[years.length - 1]}—{years[0]}
          </div>
        </div>
      </div>
    </section>
  </ProgressBar.Done>
);

export default withPageMeta(Blog, {
  type: 'website',
  title: 'blog',
  description: 'alex.fedoseev blog',
});
