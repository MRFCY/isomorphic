import React from 'react';
import {Router, Route} from 'react-router';
import App from '../containers/App';

/* eslint-disable react/display-name */
export default history => (
  <Router history={history}>
    <Route path="/" component={App}/>
  </Router>
);
