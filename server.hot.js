/* @flow */
/* eslint-disable import/no-extraneous-dependencies */

import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import historyApiFallback from 'connect-history-api-fallback';

import { HOT_PORT } from 'config';
import buildConfig from 'config/webpack/client.dev.babel';

let initialCompile = true;

const server = express();
const compiler = webpack(buildConfig);

server.use(historyApiFallback({ verbose: false }));

server.use(
  webpackDevMiddleware(compiler, {
    publicPath: buildConfig.output.publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
    quiet: false,
    noInfo: false,
    lazy: false,
    stats: { colors: true },
  }),
);

server.use(webpackHotMiddleware(compiler));

// $FlowIgnoreMe
server.listen(
  HOT_PORT,
  error =>
    /* eslint-disable no-console */
    error
      ? console.log('=> OMG!!! 🙀 ', error)
      : console.log('=> 🔥  HOT server is running on port', HOT_PORT),
  /* eslint-enable no-console */
);

compiler.plugin('done', () => {
  if (initialCompile) {
    initialCompile = false;
    // $FlowIgnoreMe
    process.send('compiled');
  }
});
