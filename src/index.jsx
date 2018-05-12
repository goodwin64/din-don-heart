import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import AppComponent from './App';
import registerServiceWorker from './registerServiceWorker';
import initImagePicker from './helpers/image-picker.helper';

ReactDOM.render(<AppComponent />, document.getElementById('root'));

registerServiceWorker();

initImagePicker(
  document.getElementById('outCanvas'),
  document.getElementById('filepicker'),
);
