/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as GA from './GA';

ReactDOM.render(<App />, document.getElementById('app'));
GA.init();
