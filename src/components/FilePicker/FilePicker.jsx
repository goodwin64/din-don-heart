import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FilePickerContainer, FilePickerInput, FilePickerLabel, FilePickerLabelText } from '../App/App.styled';
import { resetEcgResult } from '../../actions/actions';
import { imageParsingWorkerPT, localizationPT, resetEcgResultPT } from '../../helpers/proptypes.helper';

export class FilePicker extends Component {
  static propTypes = {
    localization: localizationPT.isRequired,
    resetEcgResult: resetEcgResultPT.isRequired,
    imageParsingWorker: imageParsingWorkerPT.isRequired,
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
      </FilePickerContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    imageParsingWorker: state.appCommonParams.imageParsingWorker,
    localization: state.appCommonParams.localization,
  };
}

export default connect(mapStateToProps, {
  resetEcgResult,
})(FilePicker);
