/* @flow */

import pug from 'pug';

import type { $Request, $Response } from 'express';

import { getAsset } from './utils';

export default (req: $Request, res: $Response) => {
  const template = `${process.cwd()}/server/templates/index.pug`;
  const locals = {
    app: getAsset('app', 'js'),
    vendor: getAsset('vendor', 'js'),
    manifest: getAsset('manifest', 'js'),
    body: null,
  };

  const html = pug.compileFile(template, { pretty: false })(locals);

  return res.send(html);
};
