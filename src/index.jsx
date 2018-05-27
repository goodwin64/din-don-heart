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

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducer,
  // preloadedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

ReactDOM.render(
  <Provider store={store}>
    <AppComponent imageParsingWorker={imageParsingWorker} />
  </Provider>,
  document.getElementById('root'),
);
