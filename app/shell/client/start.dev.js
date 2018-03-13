/* @flow */
/* eslint-disable import/no-extraneous-dependencies */

import * as React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App';

const domNode = document.getElementById('app');

if (!domNode) throw new Error('No #app dom node');

const renderApp = () => {
  ReactDOM.hydrate(
    <AppContainer>
      <App />
    </AppContainer>,
    domNode,
  );
};

renderApp();

if (module.hot) {
  // $FlowIgnoreMe
  module.hot.accept('./App', renderApp);
}
