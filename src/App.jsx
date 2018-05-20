import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './App.css';
import { getEcgResult } from './helpers/image-parsing.helper';
import {
  CanvasContainer,
  ClearCanvasButton,
  FilePickerContainer,
  FilePickerInput,
  FilePickerLabel,
  ImageOutCanvas,
} from './App.styled';
import { CLOSE_CHARACTER } from './constants';

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
      if (workerResponse.constructor === ImageBitmap) {
        this.setState({ ecgResult });
        this.renderEcgImageResult(workerResponse);
      }
    };
    this.props.imageParsingWorker.setOnMessageHandler(onMessageWorkerHandler);
  }

  onFileChange = (inputEvent) => {
    const file = inputEvent.target.files[0] || defaultFile;
    this.props.imageParsingWorker.postMessage({ file });
  };

  clearCanvas = () => {
    const canvas = this.ecgCanvasOut;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  clearEcgResults = () => {
    this.clearCanvas();
    this.setState({ ecgResult: {} });
    this.filePicker.value = '';
  };

  isEcgResultVisible = () => {
    const {
      baseLineY,
      cellsSize,
      ecgLetters,
    } = this.state.ecgResult;

    return Boolean(baseLineY && cellsSize && ecgLetters);
  };

  /**
   * Renders a copy of image into canvas.
   * Keeps original aspect ratio.
   * Centers image inside canvas.
   */
  renderEcgImageResult(image) {
    const { plotPoints, cellsSize } = this.state.ecgResult;
    this.clearCanvas();
    const canvas = this.ecgCanvasOut;
    const ctx = canvas.getContext('2d');
    const hRatio = canvas.width / image.width;
    const vRatio = canvas.height / image.height;
    const ratio = Math.min(hRatio, vRatio);
    const centerShiftX = (canvas.width - (image.width * ratio)) / 2;
    const centerShiftY = (canvas.height - (image.height * ratio)) / 2;
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
    if (!this.isEcgResultVisible()) {
      return null;
    }

    return (
      <div className="ecg-result">
        <p>Your ECG result:</p>
        <p>ECG base line (px): {this.state.ecgResult.baseLineY}</p>
        <p>Cells size (px): {this.state.ecgResult.cellsSize}</p>
        <p>ECG letters: {this.state.ecgResult.ecgLetters}</p>
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
        <FilePickerContainer>
          <FilePickerInput
            type="file"
            id="file-picker"
            onChange={this.onFileChange}
            innerRef={(node) => {
              this.filePicker = node;
            }}
          />
          <FilePickerLabel htmlFor="file-picker">
            <span role="img" aria-label="Choose a file">📁</span>
            Choose a file
          </FilePickerLabel>
        </FilePickerContainer>
        <CanvasContainer>
          <ImageOutCanvas
            height={240}
            width={720}
            innerRef={(node) => {
              this.ecgCanvasOut = node;
            }}
          />
          {
            this.isEcgResultVisible() &&
            <ClearCanvasButton
              onClick={this.clearEcgResults}
            >
              { CLOSE_CHARACTER }
            </ClearCanvasButton>
          }
        </CanvasContainer>
        {this.renderEcgTextResult()}
      </div>
    );
  }
}

export default App;
