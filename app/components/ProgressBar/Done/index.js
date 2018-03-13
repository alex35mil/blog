/* @flow */

import * as React from 'react';
import NProgress from 'nprogress';

type $Props = {| children?: React.Node |};

class ProgressBarDone extends React.Component<$Props> {
  props: $Props;
  componentDidMount = () => NProgress.done();
  render = () => React.Children.only(this.props.children);
}

export default ProgressBarDone;
