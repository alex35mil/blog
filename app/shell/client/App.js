/* @flow */

import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { initProgressBar, ProgressBar } from 'app/components/ProgressBar';
import Routes from 'app/shell/routes';

import 'app/styles/index.css';

initProgressBar();

const App = () => (
  <Router>
    <ProgressBar.Start>
      <Routes />
    </ProgressBar.Start>
  </Router>
);

export default App;
