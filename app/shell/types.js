/* @flow */

export type $PostId = string;

export type $PostData = {|
  title: string,
  date: string,
|};

export type $PostProps = {|
  title: string,
  date: string,
  slug: $PostId,
|};
