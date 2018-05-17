import React from 'react';
import PropTypes from 'prop-types';

import logo from './logo.svg';
import './App.css';
import { getEcgResult } from './helpers/image-picker.helper';

const defaultFile = {};

export class App extends React.PureComponent {
  static propTypes = {
    imageParsingWorker: PropTypes.shape({
      onmessage: PropTypes.func,
      postMessage: PropTypes.func,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      ecgResult: '',
    };
  }

  onFileChange = (inputEvent) => {
    const file = inputEvent.target.files[0] || defaultFile;
    this.props.imageParsingWorker.postMessage({ file });
    this.props.imageParsingWorker.onmessage = (workerEvent) => {
      const workerResponse = workerEvent.data;
      const ecgResult = getEcgResult(workerResponse);
      this.setState({ ecgResult });
    };
  };

  renderEcgResult() {
    return (
      this.state.ecgResult
        ? `Your ECG result: ${this.state.ecgResult}`
        : ''
    );
  }

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
        <p>{ this.renderEcgResult() }</p>
      </div>
    );
  }
}

export default App;
