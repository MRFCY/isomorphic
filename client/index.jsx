// TODO: Figure out how to SSR global styles
import '../common/styles/global.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import createStore from '../common/store';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

const store = createStore(window.__INITIAL_STATE__);
const history = syncHistoryWithStore(browserHistory, store);
const rootElement = document.getElementById('root');

let render = () => {
  ReactDOM.unmountComponentAtNode(rootElement);
  ReactDOM.render(<Provider store={store}>
    {require('../common/routes')(history)}
  </Provider>, rootElement);
};

if (module.hot) {
  const renderNormally = render;
  const renderExcepted = (error) => {
    const RedBox = require('redbox-react');
    ReactDOM.render(<RedBox error={error}/>, rootElement);
  };

  render = () => {
    try {
      renderNormally();
    } catch (error) {
      renderExcepted(error);
    }
  };

  module.hot.accept('../common/routes', () => {
    render();
  });
}

render();
