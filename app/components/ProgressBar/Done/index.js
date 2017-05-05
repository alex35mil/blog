/* @flow */

import React from 'react';
import NProgress from 'nprogress';

type $Props = {| children?: React.Element<*> |};

export default class ProgressBarDone extends React.Component {
  props: $Props;
  componentDidMount = () => NProgress.done();
  render = () => React.Children.only(this.props.children);
}
