import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './index.css';
import ConnectedApp from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers/mainReducer';

registerServiceWorker();

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducer,
  // preloadedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root'),
);
