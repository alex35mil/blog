/* @flow */

import React from 'react';
import NProgress from 'nprogress';

type $Props = {| children?: React.Element<*> |};

export default class ProgressBarDone extends React.Component {
  props: $Props;
  componentDidMount = () => {
    window.scrollTo(0, 0);
    NProgress.done();
  };
  render = () => React.Children.only(this.props.children);
}
