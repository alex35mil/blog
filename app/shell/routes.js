/* @flow */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import posts from './storage/posts';
import load from './loader';
import withPostProps from './withPostProps';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={load(() => import('../pages/Main'))} />
    {Object.keys(posts).map(postId => (
      <Route
        key={postId}
        path={`/blog/${postId}`}
        component={withPostProps(postId, load(posts[postId]))}
      />
    ))}
  </Switch>
);

export default Routes;
