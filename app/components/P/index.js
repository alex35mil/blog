/* @flow */

import * as React from 'react';
import cn from 'classnames';

import styles from './styles.css';

type $Props = {|
  className?: string,
  children?: React.Node,
|};

export const P = ({ className, children }: $Props) => (
  <p className={cn(styles.paragraph, className)}>{children}</p>
);
