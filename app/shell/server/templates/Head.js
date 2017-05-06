/* @flow */

import React from 'react';

import type { $Meta } from 'app/shell/types';

import { DOMAIN, FACEBOOK_APP_ID } from 'config';

type $Props = {|
  meta: $Meta,
  styles: string | null,
|};

const Head = ({ meta, styles }: $Props) => (
  <head>
    <base href="/" />
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>{meta.title} | alexfedoseev.com</title>
    <meta name="description" content={meta.description} />
    <meta name="keywords" content="javascript, js, react, redux, node, css" />

    <meta property="og:type" content={meta.type} />
    <meta property="og:title" content={meta.title} />
    <meta property="og:site_name" content="alexfedoseev.com" />
    <meta property="og:url" content={`${DOMAIN}${meta.location.pathname}`} />
    <meta property="og:description" content={meta.description} />
    {meta.image && <meta property="og:image" content={`${DOMAIN}${meta.image}`} />}
    <meta property="fb:app_id" content={FACEBOOK_APP_ID} />
    <meta property="article:author" content="https://www.facebook.com/alex.fedoseev" />

    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
    <link rel="image_src" href={`${DOMAIN}/images/apple-touch-icon.png`} />

    {styles && <link rel="stylesheet" href={styles} />}
  </head>
);

export default Head;
