import React from 'react';
import ReactDOM from 'react-dom';

import { RootCmp } from './root-cmp'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux';
import {store} from './store/store'
import './assets/css/main.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <RootCmp />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);