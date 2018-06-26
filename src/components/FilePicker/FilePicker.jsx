import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  resetEcgResult,
  setEcgExamplesVisibility,
} from '../../actions/actions';
import {
  localizationPT,
  resetEcgResultPT,
  areEcgExamplesVisiblePT,
  setEcgExamplesVisibilityPT,
} from '../../helpers/proptypes.helper';
import {
  ButtonsDelimiter,
  FilePickerContainer,
  FilePickerInput,
  FilePickerLabel,
  FilePickerLabelText,
  ShowExamplesButton,
} from './FilePicker.styled';
import imageParsingWorker from '../../helpers/image-parsing-worker';

export class FilePicker extends Component {
  static propTypes = {
    localization: localizationPT.isRequired,
    resetEcgResult: resetEcgResultPT.isRequired,
    areEcgExamplesVisible: areEcgExamplesVisiblePT.isRequired,
    setEcgExamplesVisibility: setEcgExamplesVisibilityPT.isRequired,
  };

  onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      imageParsingWorker.postMessage({ file });
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
        <ButtonsDelimiter>{this.props.localization.or}</ButtonsDelimiter>
        {this.props.areEcgExamplesVisible ? (
          <ShowExamplesButton onClick={() => this.props.setEcgExamplesVisibility(false)}>
            {this.props.localization.hideExamples}
          </ShowExamplesButton>
        ) : (
          <ShowExamplesButton onClick={() => this.props.setEcgExamplesVisibility(true)}>
            {this.props.localization.showExamples}
          </ShowExamplesButton>
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
