/* @flow */

import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';

import { locations, WEB_PORT } from 'config';
import App from 'app/shell/server/App';

const server = express();

server.use(express.static(locations.publicPath));
server.use(favicon(path.join(locations.publicPath, 'favicon.ico')));
server.use('/', App);

server.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log('=> 🚀  WEB server is running on port', WEB_PORT);
});
