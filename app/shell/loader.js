/* @flow */

import React from 'react';
import Loadable from 'react-loadable';
import NProgress from 'nprogress';

NProgress.configure({
  showSpinner: false,
  trickle: true,
  speed: 200,
});

class LoadingComponent extends React.Component {
  componentDidMount = () => NProgress.start();
  componentWillUnmount = () => NProgress.done();
  render = () => null; // TODO: Handle failure
}

// $FlowIgnoreMe: I assume flow can't infer what's behind dynamic import
export type $Loader = () => Promise<<P>(props?: P) => React.Element<*>>;

export default (loader: $Loader) => Loadable({
  loader,
  LoadingComponent,
});
