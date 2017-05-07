/* @flow */

import React from 'react';

import styles from './styles.css';

type $Props = {| children?: React.Element<*> |};

export const Code = ({ children }: $Props) => <code className={styles.code}>{children}</code>;
