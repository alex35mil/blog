/* @flow */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import load from './loader';
import resolvers from './storage/resolvers';
import withLoadedPostProps from './withLoadedPostProps';

export const routes = {
  blog: () => '/blog',
  post: (year: string, postId: string) => `/${year}/${postId}`,
};

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
      path={routes.blog()}
      component={load({
        resolve: () => import('../pages/Blog'),
        // $FlowIgnoreMe: require.resolveWeak is webpack's method
        getWebpackId: () => require.resolveWeak('../pages/Blog'),
      })}
    />
    {Object.keys(resolvers).map(year =>
      Object.keys(resolvers[year]).map(postId => (
        <Route
          exact
          key={`${year}${postId}`}
          path={routes.post(year, postId)}
          component={withLoadedPostProps(year, postId, load(resolvers[year][postId]))}
        />
      )),
    )}
  </Switch>
);

export default Routes;
