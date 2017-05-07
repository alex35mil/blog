/* @flow */

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import type { $Meta } from 'app/shell/types';

import Head from './Head';
import Body from './Body';

export type $Styles = {|
  app: string | null,
  vendor: string | null,
|};

export type $Scripts = {|
  app: string,
  vendor: string,
  manifest: string,
  chunks: Array<string>,
|};

type $Props = {|
  body: string,
  meta: $Meta,
  styles: $Styles,
  scripts: $Scripts,
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
