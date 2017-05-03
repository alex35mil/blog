/* @flow */

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { flushWebpackRequireWeakIds } from 'react-loadable';

import type { $Request, $Response } from 'express';

import Routes from '../routes';

import getHtml from './templates/Html';
import { getChunks, getAsset } from './utils';

export default (req: $Request, res: $Response) => {
  const context = {};

  const body = ReactDOMServer.renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <Routes />
    </StaticRouter>,
  );

  // TODO: 3xx, 4xx
  if (context.url) {
    return res.redirect(301, context.url);
  }

  const renderedModules = flushWebpackRequireWeakIds();
  const chunks = getChunks(renderedModules);

  const html = getHtml({
    body,
    styles: __DEV__ ? null : getAsset('app.css'),
    scripts: {
      app: getAsset('app.js'),
      vendor: getAsset('vendor.js'),
      manifest: getAsset('manifest.js'),
      chunks: chunks.map(chunk => getAsset(`${chunk}.js`)),
    },
  });

  return res.send(html);
};
