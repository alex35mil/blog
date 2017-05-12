/* @flow */

import React from 'react';
import cn from 'classnames';

import styles from './styles.css';

type $Props = {|
  title?: string,
  className?: string,
  children?: React.Element<*>,
  setRef?: (ref: HTMLElement) => void,
  onClick: () => void,
|};

export const Control = ({ className, title, children, onClick, setRef }: $Props) => (
  <button
    type="button"
    className={cn(styles.control, className)}
    title={title}
    ref={setRef}
    onClick={onClick}
  >
    {children}
  </button>
);
