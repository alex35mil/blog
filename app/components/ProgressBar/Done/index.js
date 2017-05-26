/* @flow */

import React from 'react';
import { withRouter } from 'react-router-dom';
import NProgress from 'nprogress';

import type { Location as $Location } from 'react-router';

import * as GA from 'app/shell/client/GA';

type $Props = {|
  location: $Location,
  children?: React.Element<*>,
|};

class ProgressBarDone extends React.Component {
  props: $Props;
  componentDidMount = () => {
    // TODO: Too much unrelated to ProgressBar staff here.
    //       Worth to break it down into separate components.
    window.scrollTo(0, 0);
    NProgress.done();
    GA.sendPageview(this.props.location.pathname);
  };
  render = () => React.Children.only(this.props.children);
}

export default withRouter(ProgressBarDone);
