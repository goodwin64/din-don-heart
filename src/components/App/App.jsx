import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './App.css';
import { getEcgResult } from '../../helpers/image-parsing.helper';
import {
  ecgResultPT,
  setCurrentImagePT,
  imageParsingWorkerPT,
  setEcgResultVisibilityPT,
  onDiseaseResultLocalAnalysisPT,
} from '../../helpers/proptypes.helper';
import { AppDescription } from './App.styled';
import strings from '../LanguageSelector/localization';

import LanguageSelector from '../LanguageSelector/LanguageSelector';
import Header from '../Header/Header';
import FilePicker from '../FilePicker/FilePicker';
import EcgResults from '../EcgResults/EcgResults';
import DiseaseDetector from '../DiseaseDetector/DiseaseDetector';
import { onImageError } from '../../helpers/error-handlers.helper';
import { getImageData } from '../../helpers/canvas.helper';
import {
  setCurrentImage,
  setEcgResultVisibility,
  onDiseaseResultLocalAnalysis,
} from '../../actions/onDiseaseResult';

export class App extends Component {
  static propTypes = {
    imageParsingWorker: imageParsingWorkerPT.isRequired,
    ecgResult: ecgResultPT.isRequired,
    isEcgResultVisible: PropTypes.bool.isRequired,
    setCurrentImage: setCurrentImagePT.isRequired,
    setEcgResultVisibility: setEcgResultVisibilityPT.isRequired,
    onDiseaseResultLocalAnalysis: onDiseaseResultLocalAnalysisPT.isRequired,
  };

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
        this.props.onDiseaseResultLocalAnalysis(ecgResult);
        this.props.setCurrentImage(workerResponse);
        this.props.setEcgResultVisibility(true);
      }
    };
    this.props.imageParsingWorker.setOnMessageHandler(onMessageWorkerHandler);
  }

  render() {
    const {
      isEcgResultVisible,
      ecgResult: {
        ecgLetters,
        ecgLettersDetailed,
      },
    } = this.props;

    return (
      <div className="App">
        <Header />
        <LanguageSelector />
        <AppDescription>{strings.appDescription}</AppDescription>
        <FilePicker imageParsingWorker={this.props.imageParsingWorker} />
        {isEcgResultVisible && <EcgResults />}
        {ecgLetters.length > 0 && (
          <DiseaseDetector
            ecgLettersDetailed={ecgLettersDetailed}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ecgResult: state.ecgResult,
    currentLanguage: state.appCommonParams.currentLanguage,
    isEcgResultVisible: state.appCommonParams.isEcgResultVisible,
  };
}

export default connect(mapStateToProps, {
  onDiseaseResultLocalAnalysis,
  setEcgResultVisibility,
  setCurrentImage,
})(App);
