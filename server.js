/* @flow */

import express from 'express';
import path from 'path';

import { WEB_PORT } from 'config';
import App from 'app/shell/server/App';

const server = express();

server.use(express.static(path.join(process.cwd(), 'public')));
server.use('/', App);

server.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log('=> 🚀  WEB server is running on port', WEB_PORT);
});
