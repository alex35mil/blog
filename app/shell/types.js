/* @flow */

import type { Location as $Location } from 'react-router';

export type $PostId = string;

export type $PostData = {|
  title: string,
  date: string,
|};

export type $PostProps = {|
  title: string,
  year: string,
  date: string,
  slug: $PostId,
  shareLink: string,
  facebookAppId: string,
  copyright: {|
    start: string,
    end: string,
  |},
|};

export type $Meta = {|
  type: 'profile' | 'website' | 'article',
  title: string,
  description: string,
  image?: string,
  location: $Location,
|};

export type $PageMeta = {|
  type: 'profile' | 'website',
  title: string,
  description: string,
  image?: string,
|};

export type $PostMeta = {|
  type: 'article',
  description: string,
  image?: string,
|};

export type $StaticContext = {|
  url?: string,
  meta?: $Meta,
|};
