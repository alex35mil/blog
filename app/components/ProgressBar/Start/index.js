/* @flow */

import * as React from 'react';
import { withRouter, type RouterHistory } from 'react-router-dom';
import NProgress from 'nprogress';

type $Props = {
  history: RouterHistory,
  children?: React.Node,
};

class ProgressBarStart extends React.Component<$Props> {
  props: $Props;
  removeListener: () => void;
  componentDidMount = () => {
    this.removeListener = this.props.history.listen(this.startProgress);
  };
  componentWillUnmount = () => this.removeListener();
  startProgress = () => NProgress.start();
  render = () => React.Children.only(this.props.children);
}

export default withRouter(ProgressBarStart);
