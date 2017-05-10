/* @flow */

import React from 'react';

import { Svg } from '../index';

type $Props = {| className?: string |};

export const Sources = ({ className }: $Props) => (
  <Svg title="Sources" className={className}>
    <path d="M5 5v2.339c-1.879 2.383-3 5.391-3 8.661h1c0-1.755 0.344-3.458 1.021-5.060 0.447-1.058 1.027-2.042 1.73-2.94h2.249v-2.249c0.898-0.703 1.882-1.283 2.94-1.73 1.602-0.678 3.304-1.021 5.060-1.021v-1c-3.27 0-6.278 1.121-8.661 3h-2.339zM5 15h2v1h-2v-1zM9 15h2v1h-2v-1zM15 13v2h-2v1h3v-3h-1zM15 5h1v2h-1v-2zM15 9h1v2h-1v-2z" />
    <path d="M1 5c-0.552 0-1 0.448-1 1s0.448 1 1 1v9h1v-10c0-0.552-0.448-1-1-1z" />
    <path d="M7 1c0-0.552-0.448-1-1-1s-1 0.448-1 1 0.448 1 1 1h10v-1h-9z" />
  </Svg>
);
