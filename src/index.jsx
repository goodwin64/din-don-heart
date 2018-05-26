import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './index.css';
import AppComponent from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import initImageParsingWorker from './helpers/image-parsing.helper';
import reducer from './reducers/mainReducer';

registerServiceWorker();

const imageParsingWorker = initImageParsingWorker();

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <AppComponent imageParsingWorker={imageParsingWorker} />
  </Provider>,
  document.getElementById('root'),
);
