/* @flow */

import React from 'react';

type $Props = {|
  body: string,
  scripts: {|
    app: string,
    vendor: string,
    manifest: string,
    chunks: Array<string>,
  |},
|};

const Body = ({ body, scripts }: $Props) => (
  <body>
    <div
      id="app"
      dangerouslySetInnerHTML={{ __html: body }} // eslint-disable-line react/no-danger
    />
    <script src={scripts.manifest} />
    <script src={scripts.vendor} />
    {scripts.chunks.map(chunk => <script key={chunk} src={chunk} />)}
    <script src={scripts.app} />
  </body>
);

export default Body;
