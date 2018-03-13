/* @flow */

import * as React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as GA from './GA';

const domNode = document.getElementById('app');

if (!domNode) throw new Error('No #app dom node');

ReactDOM.hydrate(<App />, domNode);
GA.init();
