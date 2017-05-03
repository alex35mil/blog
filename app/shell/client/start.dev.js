/* @flow */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App';

const renderApp = () => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('app'),
  );
};

renderApp();

if (module.hot) {
  // $FlowIgnoreMe
  module.hot.accept('./App', renderApp);
}
