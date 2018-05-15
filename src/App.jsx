import React from 'react';
import PropTypes from 'prop-types';

import logo from './logo.svg';
import './App.css';

const defaultFile = {};

export class App extends React.PureComponent {
  static propTypes = {
    imageParsingWorker: PropTypes.shape({
      postMessage: PropTypes.func,
    }).isRequired,
  };

  onFileChange = (e) => {
    const file = e.target.files[0] || defaultFile;
    this.props.imageParsingWorker.postMessage({ file });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Din-Don ❤</h1>
        </header>
        <p className="motto">
          Everything you should know about your heart
        </p>
        <input type="file" id="filepicker" onChange={this.onFileChange} />
        <canvas id="outCanvas" />
      </div>
    );
  }
}

export default App;
