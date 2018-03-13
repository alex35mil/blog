/* @flow */

import * as React from 'react';
import { withRouter } from 'react-router-dom';

import type {
  Location as $Location,
  RouterHistory as $History,
  Match as $Match,
} from 'react-router';

import * as GA from 'app/shell/client/GA';

import { ProgressBar } from 'app/components';

type $Props = {|
  location: $Location,
  history: $History,
  match: $Match,
  children?: React.Node,
|};

class Page extends React.Component<$Props> {
  props: $Props;
  componentDidMount = () => {
    window.scrollTo(0, 0);
    GA.sendPageview(this.props.location.pathname);
  };
  render = () => (
    <ProgressBar.Done>
      {React.Children.only(this.props.children)}
    </ProgressBar.Done>
  );
}

export default withRouter(Page);
