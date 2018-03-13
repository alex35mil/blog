/* @flow */

import * as React from 'react';

import { Svg } from '../index';

type $Props = {| className?: string |};

export const Caret = ({ className }: $Props) => (
  <Svg title="Caret" className={className}>
    <path d="M3.5 6l4.5 4.5 4.5-4.5h-9z" />
  </Svg>
);
