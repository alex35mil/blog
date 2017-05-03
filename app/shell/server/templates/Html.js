/* @flow */

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Head from './Head';
import Body from './Body';

type $Props = {|
  body: string,
  styles: string | null,
  scripts: {|
    app: string,
    vendor: string,
    manifest: string,
    chunks: Array<string>,
  |},
|};

const Html = ({ body, scripts, styles }: $Props) => (
  <html lang="en">
    <Head {...{ styles }} />
    <Body {...{ body, scripts }} />
  </html>
);

export default (props: $Props) => {
  // $FlowIgnoreMe: Exact type + props destructuring
  const html = ReactDOMServer.renderToStaticMarkup(<Html {...props} />);
  return `<!DOCTYPE html>${html}`;
};
