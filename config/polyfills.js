'use strict';
import mockWorker from '../src/mocks/MockWorker';
/* eslint-disable */

if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require('promise/lib/rejection-tracking').enable();
  window.Promise = require('promise/lib/es6-extensions.js');
}

// fetch() polyfill for making API calls.
require('whatwg-fetch');

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign');

// In tests, polyfill requestAnimationFrame since jsdom doesn't provide it yet.
// We don't polyfill it in the browser--this is user's responsibility.
if (process.env.NODE_ENV === 'test') {
  require('raf').polyfill(global);
}

if (typeof Blob === 'undefined') {
  global.Blob = function (content, options) {
    return { content: content, options: options };
  };
}

if (typeof URL === 'undefined' || typeof URL.createObjectURL !== 'function') {
  global.URL = {
    createObjectURL: function () {}
  };
}

if (typeof Worker === 'undefined') {
  global.Worker = mockWorker;
}
