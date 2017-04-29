/* @flow */

import React from 'react';

import posts from './storage/posts.json';

const withPostProps = (
  postId: string,
  Post: () => React.Element<*>,
) => () => (
  <Post slug={postId} {...posts[postId]} />
);

export default withPostProps;
