/* @flow */

import React from 'react';

import { ListItem } from './Item';

import styles from './styles.css';

type $Props = {|
  ordered?: boolean,
  children?: React.Element<*>,
|};

const List = ({ ordered, children }: $Props) =>
  ordered
    ? <ol className={styles.list}>{children}</ol>
    : <ul className={styles.list}>{children}</ul>;

List.Item = ListItem;

export { List };
