import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import AppComponent from './App';
import registerServiceWorker from './registerServiceWorker';
import initImageParsingWorker from './helpers/image-picker.helper';

registerServiceWorker();

const imageParsingWorker = initImageParsingWorker();

ReactDOM.render(
  <AppComponent imageParsingWorker={imageParsingWorker} />,
  document.getElementById('root'),
);
