/* @flow */

import React from 'react';

import type { $PostProps } from 'app/shell/types';

import { Post, H2, P, Link, Note } from 'app/components';
import withPostMeta from 'app/shell/withPostMeta';

import coverImage from './images/cover.jpg';

const IsomorphicReactWithRailsPartI = (props: $PostProps) => (
  <Post cover={coverImage} {...props}>
    <P>
      I’d like to share intermediate results of my work with
      Universal (aka “Isomorphic”) JavaScript apps, based on
      {' '}
      <Link native targetBlank to="http://facebook.github.io/react/">
        React
      </Link>
      {' '}
      library from Facebook and
      {' '}
      <Link native targetBlank to="http://rubyonrails.org">Ruby on Rails</Link>
      {' '}
      as backend.
    </P>
    <Note>
      Actually it’s not so much about Rails, but about JSON API. So if you don’t use/like Rails,
      just take it as an abstract API and keep reading.
    </Note>
    <P>
      If you haven’t heard about isomorphic javascript concept, here is
      {' '}
      <Link native targetBlank to="http://nerds.airbnb.com/isomorphic-javascript-future-web-apps">
        the link
      </Link>
      {' '}
      that explains what it’s all about.
    </P>
    <P>
      Within current post we’ll plan application architecture.
      In the next one we’ll setup Rails JSON API.
      After that we’ll kick-start universal javascript app.
      Before we’ll share it with the world, we’ll secure it.
      And in the end everything will be deployed to production.
    </P>

    <H2>Planning the application</H2>
    <P>
      I’ve been trying to implement JS server rendering within Rails app using
      {' '}
      <Link native targetBlank to="https://github.com/reactjs/react-rails">
        react-rails
      </Link>
      {' '}
      gem, but it’s not the way to go. Tools play best in environments,
      for which they were designed. So I cut whole front-end stuff out of Rails
      and moved it to Node.js.
    </P>
  </Post>
);

export default withPostMeta(IsomorphicReactWithRailsPartI, {
  type: 'article',
  description: 'Isomorphic JavaScript apps with React and Ruby on Rails as backend.',
});
