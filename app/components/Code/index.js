/* @flow */

import React from 'react';

import styles from './styles.css';

type $Props = {| children?: React.Element<*> |};

// Not `Code` to make it shorter
export const C = ({ children }: $Props) => <code className={styles.code}>{children}</code>;
