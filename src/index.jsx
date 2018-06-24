import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './index.css';
import ConnectedApp from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers/mainReducer';
import StateLoader from './helpers/StateLoader';

registerServiceWorker();

const stateLoader = new StateLoader();

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducer,
  stateLoader.loadState(),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

store.subscribe(() => {
  stateLoader.saveState(store.getState());
});

const isLocalhost = process.env.NODE_ENV === 'development';
const BrowserRouterBasename = isLocalhost ? '/' : '/din-don-heart/';

ReactDOM.render(
  <BrowserRouter basename={BrowserRouterBasename}>
    <Provider store={store}>
      <ConnectedApp />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
