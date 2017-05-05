/* @flow */

import React from 'react';
import { Link } from 'react-router-dom';

import { ProgressBar } from 'app/components';

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
            <Link to={`/blog/${postId}`}>
              {posts[postId].title}
            </Link>
          </div>
        ))}
      </div>
    </section>
  </ProgressBar.Done>
);

export default Blog;
