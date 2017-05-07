/* @flow */

import React from 'react';

import { A, ProgressBar } from 'app/components';
import withPageMeta from 'app/shell/withPageMeta';

import posts from 'app/shell/storage/posts.json';

import styles from './styles.css';

const Blog = () => (
  <ProgressBar.Done>
    <section className={styles.posts}>
      <div className={styles.container}>
        {Object.keys(posts).map(postId => (
          <div key={postId} className={styles.post}>
            <div className={styles.date}>
              {posts[postId].date}
            </div>
            <A internal href={`/blog/${postId}`}>
              {posts[postId].title}
            </A>
          </div>
        ))}
      </div>
    </section>
  </ProgressBar.Done>
);

export default withPageMeta(Blog, {
  type: 'website',
  title: 'blog',
  description: 'Blog page description',
});
