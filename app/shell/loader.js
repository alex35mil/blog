/* @flow */

import React from 'react';
import Loadable from 'react-loadable';

type $ChunkResolvers = {|
  // $FlowIgnoreMe: I assume flow can't infer what's behind dynamic import
  resolve: () => Promise<<P>(props?: P) => React.Element<*>>,
  getWebpackId: () => string,
|};

export default (chunk: $ChunkResolvers) =>
  Loadable({
    loader: chunk.resolve,
    webpackRequireWeakId: chunk.getWebpackId,
    LoadingComponent: () => null, // TODO: Handle failure
  });
