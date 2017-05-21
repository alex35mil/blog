/* @flow */

import express from 'express';

import type { $Request, $Response, NextFunction as $NextFunction } from 'express';

import App from 'app/shell/server/App';
import { WEB_PORT } from 'config';

const server = express();

server.set('etag', 'weak');
server.set('x-powered-by', false); // for security reasons

server.use(
  '/',
  (req: $Request, res: $Response, next: $NextFunction) => {
    res.header('Cache-Control', 'private, no-cache');
    next();
  },
  App,
);

server.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log('=> 🚀  WEB server is running on port', WEB_PORT);
});
