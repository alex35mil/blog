/* @flow */

import React from 'react';
import { withRouter } from 'react-router-dom';

import type { Location as $Location } from 'react-router';

import * as GA from 'app/shell/client/GA';

import { ProgressBar } from 'app/components';

type $Props = {|
  location: $Location,
  children?: React.Element<*>,
|};

class Page extends React.Component {
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
