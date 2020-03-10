import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import './styles/index.css';
import './styles/media.css';

import store from './components/store/index';
window.store = store; // For testing from console purpose

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
