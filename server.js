/* @flow */

import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';

import type { $Request, $Response, NextFunction as $NextFunction } from 'express';

import { locations, WEB_PORT } from 'config';
import App from 'app/shell/server/App';

const server = express();

// Settings
server.set('etag', 'weak');
server.set('x-powered-by', false); // for security reasons

// Static assets
server.use(
  express.static(locations.publicPath, {
    maxAge: '1y', // assets are fingerprinted, so caching all the way
  }),
);

// Favicon
server.use(favicon(path.join(locations.publicPath, 'favicon.ico')));

// App
server.use(
  '/',
  (req: $Request, res: $Response, next: $NextFunction) => {
    res.header('Cache-Control', 'private, no-cache');
    next();
  },
  App,
);

// Listen
server.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log('=> 🚀  WEB server is running on port', WEB_PORT);
});
