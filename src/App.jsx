import React, { Component } from 'react';
import PropTypes from 'prop-types';

import logo from './logo.svg';
import './App.css';
import { getEcgResult } from './helpers/image-parsing.helper';

const defaultFile = {};

export class App extends Component {
  static propTypes = {
    imageParsingWorker: PropTypes.shape({
      setOnMessageHandler: PropTypes.func.isRequired,
      postMessage: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      ecgResult: '',
    };
  }

  componentDidMount() {
    const onMessageWorkerHandler = (workerEvent) => {
      const workerResponse = workerEvent.data;
      const ecgResult = getEcgResult(workerResponse);
      this.setState({ ecgResult });
    };
    this.props.imageParsingWorker.setOnMessageHandler(onMessageWorkerHandler);
  }

  onFileChange = (inputEvent) => {
    const file = inputEvent.target.files[0] || defaultFile;
    this.props.imageParsingWorker.postMessage({ file });
  };

  renderEcgResult() {
    const {
      baseLineY,
      cellsSize,
      ecgLetters,
    } = this.state.ecgResult;

    if (!baseLineY || !cellsSize || !ecgLetters) { return null; }

    return (
      <div style={{ wordBreak: 'break-word', textAlign: 'left' }}>
        <p>Your ECG result:</p>
        <p>ECG base line (px): { baseLineY }</p>
        <p>Cells size (px): { cellsSize }</p>
        <p>ECG letters: { ecgLetters }</p>
      </div>
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
        {/* <canvas id="outCanvas" /> */}
        { this.renderEcgResult() }
      </div>
    );
  }
}

export default App;
