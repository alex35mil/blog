/* @flow */

import express from 'express';
import path from 'path';

import { WEB_PORT } from './config';
import app from './app/shell/server';

const server = express();

server.use(express.static(path.join(__dirname, 'public')));
server.use('/', app);

server.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log('=> 🚀  WEB server is running on port', WEB_PORT);
});
