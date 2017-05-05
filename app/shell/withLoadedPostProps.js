/* @flow */

import React from 'react';

import { ProgressBar } from 'app/components';

import posts from './storage/posts.json';

const withLoadedPostProps = (postId: string, Post: () => React.Element<*>) => () => (
  <ProgressBar.Done>
    <Post slug={postId} {...posts[postId]} />
  </ProgressBar.Done>
);

export default withLoadedPostProps;
