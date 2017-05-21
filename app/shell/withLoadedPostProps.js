/* @flow */

import React from 'react';

import type { Location as $Location } from 'react-router';
import type { $StaticContext } from 'app/shell/types';

import { ProgressBar } from 'app/components';
import { WEB_DOMAIN, FACEBOOK_APP_ID } from 'config';

import posts from './storage/posts.json';

type $Props = {
  location: $Location,
  staticContext?: $StaticContext,
};

const years = Object.keys(posts).sort();

const withLoadedPostProps = (year: string, postId: string, Post: () => React.Element<*>) => ({
  location,
  staticContext,
}: $Props) => (
  <ProgressBar.Done>
    <Post
      year={year}
      slug={postId}
      location={location}
      shareLink={`${WEB_DOMAIN}${location.pathname}`}
      facebookAppId={FACEBOOK_APP_ID}
      staticContext={staticContext}
      copyright={{
        start: years[0],
        end: years[years.length - 1],
      }}
      {...posts[year][postId]}
    />
  </ProgressBar.Done>
);

export default withLoadedPostProps;
