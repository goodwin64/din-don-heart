import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './App.css';
import { getEcgResult } from '../../helpers/image-parsing.helper';
import {
  ecgLettersPT,
  localizationPT,
  resetEcgResultPT,
  setCurrentImagePT,
  imageParsingWorkerPT,
  setEcgResultVisibilityPT,
  setEcgExamplesVisibilityPT,
  onDiseaseResultLocalAnalysisPT,
} from '../../helpers/proptypes.helper';
import { AppDescription } from './App.styled';

import LanguageSelector from '../LanguageSelector/LanguageSelector';
import Header from '../Header/Header';
import FilePickerHOC from '../FilePicker/FilePicker';
import EcgResults from '../EcgResults/EcgResults';
import DiseaseDetectorHOC from '../DiseaseDetector/DiseaseDetector';
import { onImageError } from '../../helpers/error-handlers.helper';
import { getImageData } from '../../helpers/canvas.helper';
import {
  setCurrentImage,
  setEcgResultVisibility,
  onDiseaseResultLocalAnalysis,
  resetEcgResult,
  setEcgExamplesVisibility,
} from '../../actions/actions';
import EcgAnalysisExample from '../EcgAnalysisExample/EcgAnalysisExample';

export class App extends Component {
  static propTypes = {
    ecgLetters: ecgLettersPT.isRequired,
    ecgLettersDetailed: ecgLettersPT.isRequired,
    localization: localizationPT.isRequired,
    resetEcgResult: resetEcgResultPT.isRequired,
    setCurrentImage: setCurrentImagePT.isRequired,
    imageParsingWorker: imageParsingWorkerPT.isRequired,
    isEcgResultVisible: PropTypes.bool.isRequired,
    areExamplesVisible: PropTypes.bool.isRequired,
    setEcgResultVisibility: setEcgResultVisibilityPT.isRequired,
    setEcgExamplesVisibility: setEcgExamplesVisibilityPT.isRequired,
    onDiseaseResultLocalAnalysis: onDiseaseResultLocalAnalysisPT.isRequired,
  };

  componentDidMount() {
    this.props.imageParsingWorker.onmessage = this.onMessageWorkerHandler;
  }

  onMessageWorkerHandler = (workerEvent) => {
    const workerResponse = workerEvent.data;
    if (workerResponse.error) {
      onImageError(workerResponse.error);
      this.props.resetEcgResult();
      return;
    }

    if (workerResponse.constructor === ImageBitmap) {
      const imageData = getImageData(workerResponse);
      const ecgResult = getEcgResult(imageData);
      this.props.onDiseaseResultLocalAnalysis(ecgResult);
      this.props.setCurrentImage(workerResponse);
      this.props.setEcgResultVisibility(true);
    }
  };

  render() {
    const {
      isEcgResultVisible,
      areExamplesVisible,
      ecgLetters,
      ecgLettersDetailed,
    } = this.props;

    return (
      <div className="App">
        <Header />
        <LanguageSelector />
        <AppDescription>{this.props.localization.appDescription}</AppDescription>
        <FilePickerHOC />
        {isEcgResultVisible && <EcgResults />}
        {ecgLetters.length > 0 && (
          <DiseaseDetectorHOC
            ecgLettersDetailed={ecgLettersDetailed}
          />
        )}
        <button onClick={() => this.props.setEcgExamplesVisibility(true)}>
          Show examples
        </button>
        <button onClick={() => this.props.setEcgExamplesVisibility(false)}>
          Hide examples
        </button>
        {areExamplesVisible && <EcgAnalysisExample />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ecgLetters: state.ecgResult.ecgLetters,
    ecgLettersDetailed: state.ecgResult.ecgLettersDetailed,
    localization: state.appCommonParams.localization,
    isEcgResultVisible: state.ecgResult.isEcgResultVisible,
    areExamplesVisible: state.appCommonParams.areEcgExamplesVisible,
    imageParsingWorker: state.appCommonParams.imageParsingWorker,
  };
}

export default connect(mapStateToProps, {
  onDiseaseResultLocalAnalysis,
  setEcgResultVisibility,
  setEcgExamplesVisibility,
  setCurrentImage,
  resetEcgResult,
})(App);
