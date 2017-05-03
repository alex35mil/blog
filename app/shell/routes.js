/* @flow */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import load from './loader';
import resolvers from './storage/resolvers';
import withPostProps from './withPostProps';

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
    {Object.keys(resolvers).map(postId => (
      <Route
        key={postId}
        path={`/blog/${postId}`}
        component={withPostProps(postId, load(resolvers[postId]))}
      />
    ))}
  </Switch>
);

export default Routes;
