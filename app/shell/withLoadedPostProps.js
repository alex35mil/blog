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

const withLoadedPostProps = (year: string, postId: string, Post: () => React.Element<*>) => ({
  location,
  staticContext,
}: $Props) => (
  <ProgressBar.Done>
    <Post
      year={year}
      slug={postId}
      location={location}
      staticContext={staticContext}
      {...posts[year][postId]}
    />
  </ProgressBar.Done>
);

export default withLoadedPostProps;
