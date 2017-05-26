/* @flow */

import React from 'react';

import type { $Meta } from 'app/shell/types';
import type { $Styles } from './Html';

import { WEB_DOMAIN, FACEBOOK_APP_ID } from 'config';

import defaultPhoto from 'app/pages/Main/images/photo.png';

type $Props = {|
  meta: $Meta,
  styles: $Styles,
|};

const Head = ({ meta, styles }: $Props) => (
  <head>
    <base href="/" />
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>{meta.title} | alexfedoseev.com</title>
    <meta name="description" content={meta.description} />
    <meta name="keywords" content="javascript, js, react, redux, node, css" />

    <meta
      property="og:title"
      content={meta.location.pathname === '/' ? 'alex.fedoseev' : meta.title}
    />
    <meta property="og:type" content={meta.type} />
    <meta property="og:site_name" content="alexfedoseev.com" />
    <meta property="og:url" content={`${WEB_DOMAIN}${meta.location.pathname}`} />
    <meta property="og:description" content={meta.description} />
    <meta property="og:image" content={`${WEB_DOMAIN}${meta.image || defaultPhoto}`} />
    <meta property="fb:app_id" content={FACEBOOK_APP_ID} />
    <meta property="article:author" content="https://www.facebook.com/alex.fedoseev" />
    <meta name="twitter:creator" content="@alexfedoseev" />

    <link rel="shortcut icon" href="/favicon.ico" />

    {styles.app && <link rel="stylesheet" href={styles.app} />}
    {styles.vendor && <link rel="stylesheet" href={styles.vendor} />}
  </head>
);

export default Head;
