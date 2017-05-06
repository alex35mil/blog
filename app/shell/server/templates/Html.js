/* @flow */

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import type { $Meta } from 'app/shell/types';

import Head from './Head';
import Body from './Body';

type $Props = {|
  body: string,
  meta: $Meta,
  styles: string | null,
  scripts: {|
    app: string,
    vendor: string,
    manifest: string,
    chunks: Array<string>,
  |},
|};

const Html = ({ body, meta, scripts, styles }: $Props) => (
  <html lang="en">
    <Head {...{ meta, styles }} />
    <Body {...{ body, scripts }} />
  </html>
);

export default (props: $Props) => {
  // $FlowIgnoreMe: Exact type + props destructuring
  const html = ReactDOMServer.renderToStaticMarkup(<Html {...props} />);
  return `<!DOCTYPE html>${html}`;
};
