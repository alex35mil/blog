/* @flow */

import React from 'react';

import type { Location as $Location } from 'react-router';
import type { $PageMeta, $StaticContext } from 'app/shell/types';

type $Page = () => React.Element<*>;

type $Props = {
  location: $Location,
  staticContext: $StaticContext,
};

const withPageMeta = (Page: $Page, meta: $PageMeta) =>
  class PageMetaInjector extends React.Component {
    props: $Props;

    componentDidMount = () => {
      document.title = `${meta.title} | alexfedoseev.com`;
    };

    render = () => {
      const { location, staticContext } = this.props;
      if (staticContext) {
        staticContext.meta = { location, ...meta };
      }
      return <Page />;
    };
  };

export default withPageMeta;
