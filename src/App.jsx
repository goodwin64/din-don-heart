import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './App.css';
import { getEcgResult } from './helpers/image-parsing.helper';
import { AppDescription } from './App.styled';
import strings, { defaultLanguage } from './localization';

import LanguageSelector from './components/LanguageSelector/LanguageSelector';
import Header from './components/Header/Header';
import FilePicker from './components/FilePicker/FilePicker';
import EcgResults from './components/EcgResults/EcgResults';
import DiseaseDetector from './components/DiseaseDetector/DiseaseDetector';
import { onImageError } from './helpers/error-handlers.helper';
import { getImageData } from './helpers/canvas.helper';

const initialEcgLetters = [];
const initialEcgLettersDetailed = [];
const initialPlotPoints = [];
const initialEcgResult = {
  baseLineY: 0,
  cellsSize: 0,
  ecgLetters: initialEcgLetters,
  ecgLettersDetailed: initialEcgLettersDetailed,
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
      diseaseResult: '',
    };
  }

  componentDidMount() {
    const onMessageWorkerHandler = (workerEvent) => {
      const workerResponse = workerEvent.data;
      if (workerResponse.constructor === ImageBitmap) {
        if (workerResponse.error) {
          onImageError(workerResponse);
          return;
        }
        const imageData = getImageData(workerResponse);
        const ecgResult = getEcgResult(imageData);
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

  onDiseaseAnalysisResult = (diseaseResult) => {
    this.setState({ diseaseResult });
  };

  afterCurrentFileReset = () => {
    this.setState({ shouldCurrentFileBeCleared: false });
  };

  beforeCurrentFileReset = () => {
    this.setState({ shouldCurrentFileBeCleared: true });
  };

  clearEcgResult = () => {
    this.setState({
      isEcgResultVisible: false,
      diseaseResult: '',
      ecgResult: initialEcgResult,
    });
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
        ecgLettersDetailed,
        plotPoints,
      },
      diseaseResult,
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
            ecgLettersDetailed={ecgLettersDetailed}
            plotPoints={plotPoints}
            currentImage={currentImage}
            clearEcgResult={this.clearEcgResult}
            resetCurrentFile={this.beforeCurrentFileReset}
            diseaseResult={diseaseResult}
          />
        )}
        {ecgLetters.length > 0 && (
          <DiseaseDetector
            ecgLetters={ecgLetters}
            onDiseaseResult={this.onDiseaseAnalysisResult}
          />
        )}
      </div>
    );
  }
}

export default App;
