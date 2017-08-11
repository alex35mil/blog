/* @flow */

import React from 'react';

import type { $Scripts } from './Html';

type $Props = {|
  body: string,
  scripts: $Scripts,
|};

const Body = ({ body, scripts }: $Props) =>
  <body>
    <div
      id="app"
      dangerouslySetInnerHTML={{ __html: body }} // eslint-disable-line react/no-danger
    />
    <script src={scripts.manifest} defer />
    <script src={scripts.vendor} defer />
    {scripts.chunks.map(chunk => <script key={chunk} src={chunk} defer />)}
    <script src={scripts.app} defer />
  </body>;

export default Body;
