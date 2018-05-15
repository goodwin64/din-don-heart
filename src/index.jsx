import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import AppComponent from './App';
import registerServiceWorker from './registerServiceWorker';
import initImagePicker from './helpers/image-picker.helper';

registerServiceWorker();

const { imageParsingWorker } = initImagePicker(
  document.getElementById('outCanvas'),
  document.getElementById('filepicker'),
);

ReactDOM.render(
  <AppComponent imageParsingWorker={imageParsingWorker} />,
  document.getElementById('root'),
);
