/* @flow */

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { flushWebpackRequireWeakIds } from 'react-loadable';

import type { $Request, $Response } from 'express';

import Routes from '../routes';
import { Error } from './templates/Error';

import getHtml from './templates/Html';
import { getChunks, getAsset } from './utils';

export default (req: $Request, res: $Response) => {
  const context = {};

  let body;
  try {
    body = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        <Routes />
      </StaticRouter>,
    );
  } catch (error) {
    const html = ReactDOMServer.renderToStaticMarkup(
      <Error status={500} message="internal server error" />,
    );
    return res.status(500).send(html);
  }

  if (context.status === 404) {
    const html = ReactDOMServer.renderToStaticMarkup(
      <Error status={404} message="not found" />,
    );
    return res.status(404).send(html);
  }

  const renderedModules = flushWebpackRequireWeakIds();
  const chunks = getChunks(renderedModules);

  const html = getHtml({
    body,
    meta: context.meta,
    styles: {
      app: __DEV__ ? null : getAsset('app.css'),
      vendor: __DEV__ ? null : getAsset('vendor.css'),
    },
    scripts: {
      app: getAsset('app.js'),
      vendor: getAsset('vendor.js'),
      manifest: getAsset('manifest.js'),
      chunks: chunks.map(chunk => getAsset(`${chunk}.js`)),
    },
  });

  return res.send(html);
};
