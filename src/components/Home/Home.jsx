import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../App/App.css';
import { getEcgResult } from '../../helpers/image-parsing.helper';
import {
  ecgLettersPT,
  localizationPT,
  resetEcgResultPT,
  setCurrentImagePT,
  imageParsingWorkerPT,
  areEcgExamplesVisiblePT,
  setEcgResultVisibilityPT,
  onDiseaseResultLocalAnalysisPT,
  userPT,
  cellsSizePT,
} from '../../helpers/proptypes.helper';
import { AppDescription, HomeContainer } from './Home.styled';

import LanguageSelector from '../LanguageSelector/LanguageSelector';
import FilePickerConnected from '../FilePicker/FilePicker';
import EcgResults from '../EcgResults/EcgResults';
import DiseaseDetectorConnected from '../DiseaseDetector/DiseaseDetector';
import EcgAnalysisExample from '../EcgAnalysisExample/EcgAnalysisExample';

import { onImageError } from '../../helpers/error-handlers.helper';
import { getImageData } from '../../helpers/canvas.helper';
import {
  setCurrentImage,
  setEcgResultVisibility,
  onDiseaseResultLocalAnalysis,
  resetEcgResult,
} from '../../actions/actions';

export class App extends Component {
  static propTypes = {
    user: userPT.isRequired,
    cellsSize: cellsSizePT.isRequired,
    ecgLetters: ecgLettersPT.isRequired,
    ecgLettersDetailed: ecgLettersPT.isRequired,
    localization: localizationPT.isRequired,
    resetEcgResult: resetEcgResultPT.isRequired,
    setCurrentImage: setCurrentImagePT.isRequired,
    imageParsingWorker: imageParsingWorkerPT.isRequired,
    isEcgResultVisible: PropTypes.bool.isRequired,
    areEcgExamplesVisible: areEcgExamplesVisiblePT.isRequired,
    setEcgResultVisibility: setEcgResultVisibilityPT.isRequired,
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
      areEcgExamplesVisible,
      ecgLetters,
      ecgLettersDetailed,
      user,
    } = this.props;

    const isAdmin = user.type === 'admin';

    return (
      <HomeContainer>
        <LanguageSelector />
        <AppDescription>{this.props.localization.appDescription}</AppDescription>
        <FilePickerConnected />
        {areEcgExamplesVisible && <EcgAnalysisExample />}
        {isEcgResultVisible && <EcgResults />}
        {ecgLetters.length > 0 && !isAdmin && (
          <DiseaseDetectorConnected
            ecgLettersDetailed={ecgLettersDetailed}
          />
        )}
        {isAdmin && (
          <DiseaseFormUploader
            cellsSize={this.props.cellsSize}
            source={this.props.ecgLettersDetailed}
          />
        )}
      </HomeContainer>
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
class DiseaseFormUploader extends React.Component {
  static propTypes = {
    cellsSize: cellsSizePT,
    source: ecgLettersPT,
  };
  static defaultProps = {
    cellsSize: 0,
    source: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      cellsSize: props.cellsSize,
      source: props.source,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      cellsSize: props.cellsSize,
      source: props.source,
    });
  }

  handleChangeCellSize = (e) => {
    this.setState({ cellsSize: e.target.value });
  };

  handleChangeSource = (e) => {
    this.setState({ source: e.target.value });
  };

  render() {
    return (
      <div className="col-md-4">
        <form action="http://176.38.3.120/EKGSample/Add" method="POST">
          <div className="form-group">
            <label className="control-label" htmlFor="Mark">Mark</label>
            <input className="form-control" type="text" id="Mark" name="Mark" defaultValue="" />
            <span
              className="text-danger field-validation-valid"
              data-valmsg-for="Mark"
              data-valmsg-replace="true"
            />
          </div>
          <div className="form-group">
            <label className="control-label" htmlFor="Source">Source</label>
            <input
              className="form-control"
              type="text"
              id="Source"
              name="Source"
              value={this.state.source}
              onChange={this.handleChangeSource}
            />
            <span
              className="text-danger field-validation-valid"
              data-valmsg-for="Source"
              data-valmsg-replace="true"
            />
          </div>
          <div className="form-group">
            <label className="control-label" htmlFor="Description">Description</label>
            <input className="form-control" type="text" id="Description" name="Description" defaultValue="" />
            <span
              className="text-danger field-validation-valid"
              data-valmsg-for="Description"
              data-valmsg-replace="true"
            />
          </div>
          <div className="form-group">
            <label className="control-label" htmlFor="cellsSize">cellsSize</label>
            <input
              className="form-control"
              type="number"
              data-val="true"
              data-val-required="The cellsSize field is required."
              id="cellsSize"
              name="cellsSize"
              value={this.state.cellsSize}
              onChange={this.handleChangeCellSize}
            />
            <span
              className="text-danger field-validation-valid"
              data-valmsg-for="cellsSize"
              data-valmsg-replace="true"
            />
          </div>
          <div className="form-group">
            <input type="submit" defaultValue="Create" className="btn btn-default" />
          </div>
          <input
            name="__RequestVerificationToken"
            type="hidden"
            defaultValue="CfDJ8DPUy1YBqOdLkjCP8xD9Uz-RJDLBYE9IQn9umxmXz9HNCKDKALpv1ui9bn_KP7otzuU3peCGtpx2Y2rEonWx3mdacIAsxuYyOATqXe1BKeKlcBC417MEuD8IGkfQeG4IcyfwqHqKXKXRFqnALadik_U"
          />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    cellsSize: state.ecgResult.cellsSize,
    ecgLetters: state.ecgResult.ecgLetters,
    ecgLettersDetailed: state.ecgResult.ecgLettersDetailed,
    localization: state.appCommonParams.localization,
    isEcgResultVisible: state.ecgResult.isEcgResultVisible,
    areEcgExamplesVisible: state.appCommonParams.areEcgExamplesVisible,
    imageParsingWorker: state.appCommonParams.imageParsingWorker,
  };
}

export default connect(mapStateToProps, {
  onDiseaseResultLocalAnalysis,
  setEcgResultVisibility,
  setCurrentImage,
  resetEcgResult,
})(App);
