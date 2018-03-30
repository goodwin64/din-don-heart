import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { App } from './App';
import registerServiceWorker from './registerServiceWorker';
import initImagePicker from './image-picker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
initImagePicker(
  document.getElementById('outCanvas'),
  document.getElementById('filepicker'),
);
