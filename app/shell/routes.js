/* @flow */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import load from './loader';
import resolvers from './storage/resolvers';
import withLoadedPostProps from './withLoadedPostProps';

const Routes = () => (
  <Switch>
    <Route
      exact
      path="/"
      component={load({
        resolve: () => import('../pages/Main'),
        // $FlowIgnoreMe: require.resolveWeak is webpack's method
        getWebpackId: () => require.resolveWeak('../pages/Main'),
      })}
    />
    <Route
      exact
      path="/blog"
      component={load({
        resolve: () => import('../pages/Blog'),
        // $FlowIgnoreMe: require.resolveWeak is webpack's method
        getWebpackId: () => require.resolveWeak('../pages/Blog'),
      })}
    />
    {Object.keys(resolvers).map(postId => (
      <Route
        exact
        key={postId}
        path={`/blog/${postId}`}
        component={withLoadedPostProps(postId, load(resolvers[postId]))}
      />
    ))}
  </Switch>
);

export default Routes;
