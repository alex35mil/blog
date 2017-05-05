/* @flow */

import React from 'react';
import { Link } from 'react-router-dom';

import { ProgressBar } from 'app/components';

import posts from 'app/shell/storage/posts.json';

import styles from './styles.css';

const Main = () => (
  <ProgressBar.Done>
    <section className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.photo} />
        <div className={styles.text}>
          <div className={styles.title}>
            alex.fedoseev
          </div>
          <div className={styles.links}>
            <a href="#posts">blog</a> | t f g
          </div>
        </div>
      </div>

      <div className={styles.separatorContainer}>
        <div className={styles.separator} />
      </div>

      <div id="posts" className={styles.posts}>
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

export default Main;
