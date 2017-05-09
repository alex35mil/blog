/* @flow */

import React from 'react';
import cn from 'classnames';

import styles from './styles.css';

type $Props = {|
  className?: string,
  children?: React.Element<*>,
  setRef?: (ref: HTMLElement) => void,
  onClick: () => void,
|};

export const Control = ({ className, children, onClick, setRef }: $Props) => (
  <button type="button" className={cn(styles.control, className)} ref={setRef} onClick={onClick}>
    {children}
  </button>
);
