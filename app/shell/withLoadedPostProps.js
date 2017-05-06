/* @flow */

import React from 'react';

import type { Location as $Location } from 'react-router';

import type { $StaticContext } from 'app/shell/types';

import { ProgressBar } from 'app/components';

import posts from './storage/posts.json';

type $Props = {
  location: $Location,
  staticContext?: $StaticContext,
};

const withLoadedPostProps = (postId: string, Post: () => React.Element<*>) => ({
  location,
  staticContext,
}: $Props) => (
  <ProgressBar.Done>
    <Post slug={postId} location={location} staticContext={staticContext} {...posts[postId]} />
  </ProgressBar.Done>
);

export default withLoadedPostProps;
