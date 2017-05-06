/* @flow */

import React from 'react';

import type { Location as $Location } from 'react-router';
import type { $PostMeta, $PostProps, $StaticContext } from 'app/shell/types';

type $Post = <P: $PostProps>(props: P) => React.Element<*>;

type $Props = {
  title: string,
  location: $Location,
  staticContext?: $StaticContext,
};

const withPostMeta = (Post: $Post, meta: $PostMeta) =>
  class PostMetaInjector extends React.Component {
    props: $Props;

    componentDidMount = () => {
      document.title = `${this.props.title} | alexfedoseev.com`;
    };

    render = () => {
      const { title, location, staticContext, ...otherProps } = this.props;
      if (staticContext) {
        staticContext.meta = { title, location, ...meta };
      }
      // $FlowIssue: exact props: https://github.com/facebook/flow/issues/2711
      return <Post title={title} {...otherProps} />;
    };
  };

export default withPostMeta;
