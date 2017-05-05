/* @flow */

import React from 'react';

type $Props = {|
  styles: string | null,
|};

const Head = ({ styles }: $Props) => (
  <head>
    <base href="/" />
    <title>alexfedoseev.com</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="shortcut icon" href="/favicon.ico" />
    {styles && <link rel="stylesheet" href={styles} />}
  </head>
);

export default Head;
