/* @flow */

import React from 'react';
import { withRouter } from 'react-router-dom';
import NProgress from 'nprogress';

type $Props = {
  history: { listen: (listener: () => void) => () => void },
  children?: React.Element<*>,
};

class ProgressBarStart extends React.Component {
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
