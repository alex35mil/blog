/* @flow */

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from 'app/shell/routes';

import 'app/styles/index.css';

const App = () => (
  <Router>
    <Routes />
  </Router>
);

export default App;
