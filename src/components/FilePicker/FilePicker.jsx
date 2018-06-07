import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FilePickerContainer, FilePickerInput, FilePickerLabel, FilePickerLabelText } from '../App/App.styled';
import {
  resetEcgResult,
  setEcgExamplesVisibility,
} from '../../actions/actions';
import {
  localizationPT,
  resetEcgResultPT,
  imageParsingWorkerPT,
  areEcgExamplesVisiblePT,
  setEcgExamplesVisibilityPT,
} from '../../helpers/proptypes.helper';

export class FilePicker extends Component {
  static propTypes = {
    localization: localizationPT.isRequired,
    resetEcgResult: resetEcgResultPT.isRequired,
    imageParsingWorker: imageParsingWorkerPT.isRequired,
    areEcgExamplesVisible: areEcgExamplesVisiblePT.isRequired,
    setEcgExamplesVisibility: setEcgExamplesVisibilityPT.isRequired,
  };

  onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      this.props.imageParsingWorker.postMessage({ file });
    } else {
      this.props.resetEcgResult();
    }
  };

  render() {
    return (
      <FilePickerContainer>
        <FilePickerInput
          type="file"
          id="file-picker"
          onChange={this.onFileChange}
          accept="image/*"
        />
        <FilePickerLabel htmlFor="file-picker">
          <span role="img" aria-label={this.props.localization.chooseFile}>📁</span>
          <FilePickerLabelText>{this.props.localization.chooseFile}</FilePickerLabelText>
        </FilePickerLabel>
        <span>or</span>
        {this.props.areEcgExamplesVisible ? (
          <button onClick={() => this.props.setEcgExamplesVisibility(false)}>
            Hide examples
          </button>
        ) : (
          <button onClick={() => this.props.setEcgExamplesVisibility(true)}>
            Show examples
          </button>
        )}

      </FilePickerContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    localization: state.appCommonParams.localization,
    imageParsingWorker: state.appCommonParams.imageParsingWorker,
    areEcgExamplesVisible: state.appCommonParams.areEcgExamplesVisible,
  };
}

export default connect(mapStateToProps, {
  resetEcgResult,
  setEcgExamplesVisibility,
})(FilePicker);
