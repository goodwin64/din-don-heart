import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import AppComponent from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import initImageParsingWorker from './helpers/image-parsing.helper';

registerServiceWorker();

const imageParsingWorker = initImageParsingWorker();

ReactDOM.render(
  <AppComponent imageParsingWorker={imageParsingWorker} />,
  document.getElementById('root'),
);
