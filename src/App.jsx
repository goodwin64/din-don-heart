import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      ecgResult: {
        baseLineY: 0,
        cellsSize: 0,
        ecgLetters: [],
        plotPoints: [],
      },
    };
    this.ecgCanvasOut = null;
  }

  componentDidMount() {
    const onMessageWorkerHandler = (workerEvent) => {
      const workerResponse = workerEvent.data;
      const ecgResult = getEcgResult(workerResponse);
      this.setState({ ecgResult });
      if (workerResponse.constructor === ImageBitmap) {
        this.renderEcgImageResult(workerResponse);
      }
    };
    this.props.imageParsingWorker.setOnMessageHandler(onMessageWorkerHandler);
  }

  onFileChange = (inputEvent) => {
    const file = inputEvent.target.files[0] || defaultFile;
    this.props.imageParsingWorker.postMessage({ file });
  };

  /**
   * Renders a copy of image into canvas.
   * Keeps original aspect ratio.
   * Centers image inside canvas.
   */
  renderEcgImageResult(image) {
    const { plotPoints, cellsSize } = this.state.ecgResult;
    const canvas = this.ecgCanvasOut;
    const ctx = canvas.getContext('2d');
    const hRatio = canvas.width / image.width;
    const vRatio = canvas.height / image.height;
    const ratio = Math.min(hRatio, vRatio);
    const centerShiftX = (canvas.width - (image.width * ratio)) / 2;
    const centerShiftY = (canvas.height - (image.height * ratio)) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      image, 0, 0, image.width, image.height,
      centerShiftX, centerShiftY, image.width * ratio, image.height * ratio,
    );

    ctx.font = '18px Georgia';
    ctx.shadowColor = '#c20001';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#fff';
    plotPoints.forEach((plotPoint, xIndex) => {
      const x = (xIndex * cellsSize * ratio) + centerShiftX;
      const y = (plotPoint.index * ratio) + centerShiftY;
      ctx.fillText(plotPoint.letter, x, y);
    });
  }

  renderEcgTextResult() {
    const {
      baseLineY,
      cellsSize,
      ecgLetters,
    } = this.state.ecgResult;

    if (!baseLineY || !cellsSize || !ecgLetters) { return null; }

    return (
      <div className="ecg-result">
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
          <h1 className="App-title">
            Din-Don
            <span className="App-logo">❤</span>
          </h1>
        </header>
        <p className="motto">
          Everything you should know about your heart
        </p>
        <input type="file" id="filepicker" onChange={this.onFileChange} />
        <canvas
          height={240}
          width={720}
          id="outCanvas"
          ref={(node) => { this.ecgCanvasOut = node; }}
        />
        { this.renderEcgTextResult() }
      </div>
    );
  }
}

export default App;
