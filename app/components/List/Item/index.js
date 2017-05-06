/* @flow */

import React from 'react';

import styles from '../styles.css';

type $Props = {| children?: React.Element<*> |};

export const ListItem = ({ children }: $Props) => <li className={styles.item}>{children}</li>;
