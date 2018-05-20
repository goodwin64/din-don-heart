import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './App.css';
import { getEcgResult } from './helpers/image-parsing.helper';
import { AppDescription } from './App.styled';
import LanguageSelector from './components/LanguageSelector/LanguageSelector';
import strings, { defaultLanguage } from './localization';
import Header from './components/Header/Header';
import FilePicker from './components/FilePicker/FilePicker';
import EcgResults from './components/EcgResults/EcgResults';

// export const noop = () => {};

const initialEcgLetters = [];
const initialPlotPoints = [];
const initialEcgResult = {
  baseLineY: 0,
  cellsSize: 0,
  ecgLetters: initialEcgLetters,
  plotPoints: initialPlotPoints,
};

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
      ecgResult: initialEcgResult,
      shouldCurrentFileBeCleared: false,
      currentImage: null,
      currentLanguage: strings.getLanguage() || defaultLanguage,
      isEcgResultVisible: false,
    };
  }

  componentDidMount() {
    const onMessageWorkerHandler = (workerEvent) => {
      const workerResponse = workerEvent.data;
      if (workerResponse.constructor === ImageBitmap) {
        const ecgResult = getEcgResult(workerResponse);
        this.setState({
          isEcgResultVisible: true,
          currentImage: workerResponse,
          ecgResult,
        });
      }
    };
    this.props.imageParsingWorker.setOnMessageHandler(onMessageWorkerHandler);
  }

  onFileChange = (file) => {
    this.props.imageParsingWorker.postMessage({ file });
    this.setState({ shouldCurrentFileBeCleared: true });
  };

  onLanguageChange = (languageCode) => {
    const currentLanguage = languageCode || defaultLanguage;
    strings.setLanguage(currentLanguage);
    this.setState({ currentLanguage });
  };

  clearEcgResult = () => {
    this.setState({ isEcgResultVisible: false });
  };

  beforeCurrentFileReset = () => {
    this.setState({ shouldCurrentFileBeCleared: true });
  };

  afterCurrentFileReset = () => {
    this.setState({ shouldCurrentFileBeCleared: false });
  };

  render() {
    const {
      currentImage,
      currentLanguage,
      isEcgResultVisible,
      shouldCurrentFileBeCleared,
      ecgResult: {
        baseLineY,
        cellsSize,
        ecgLetters,
        plotPoints,
      },
    } = this.state;

    return (
      <div className="App">
        <Header />
        <LanguageSelector
          currentLanguage={currentLanguage}
          onLanguageChange={this.onLanguageChange}
        />
        <AppDescription>{strings.appDescription}</AppDescription>
        <FilePicker
          afterCurrentFileReset={this.afterCurrentFileReset}
          onFileChange={this.onFileChange}
          shouldCurrentFileBeCleared={shouldCurrentFileBeCleared}
        />
        {isEcgResultVisible && (
          <EcgResults
            baseLineY={baseLineY}
            cellsSize={cellsSize}
            ecgLetters={ecgLetters}
            plotPoints={plotPoints}
            currentImage={currentImage}
            clearEcgResult={this.clearEcgResult}
            resetCurrentFile={this.beforeCurrentFileReset}
          />
        )}
      </div>
    );
  }
}

export default App;
