import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FilePickerContainer, FilePickerInput, FilePickerLabel } from '../App/App.styled';
import strings from '../LanguageSelector/localization';
import { setShouldCurrentFileBeCleared } from '../../actions/onDiseaseResult';
import { imageParsingWorkerPT } from '../../helpers/proptypes.helper';

class FilePicker extends Component {
  static propTypes = {
    shouldCurrentFileBeCleared: PropTypes.bool.isRequired,
    setShouldCurrentFileBeCleared: PropTypes.func.isRequired,
    imageParsingWorker: imageParsingWorkerPT.isRequired,
  };

  componentWillReceiveProps(props) {
    if (props.shouldCurrentFileBeCleared) {
      this.resetCurrentFile();
    }
  }

  onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      this.props.imageParsingWorker.postMessage({ file });
    } else {
      this.props.setShouldCurrentFileBeCleared(true);
    }
  };

  resetCurrentFile = () => {
    this.filePicker.value = '';
    this.props.setShouldCurrentFileBeCleared(false);
  };

  render() {
    return (
      <FilePickerContainer>
        <FilePickerInput
          type="file"
          id="file-picker"
          onChange={this.onFileChange}
          accept="image/*"
          innerRef={(node) => {
            this.filePicker = node;
          }}
        />
        <FilePickerLabel htmlFor="file-picker">
          <span role="img" aria-label={strings.chooseFile}>📁</span>
          {strings.chooseFile}
        </FilePickerLabel>
      </FilePickerContainer>
    );
  }
}

// TODO: wrap with currentLanguage HOC or pass "strings" from context
function mapStateToProps(state) {
  return {
    shouldCurrentFileBeCleared: state.appCommonParams.shouldCurrentFileBeCleared,
    currentLanguage: state.appCommonParams.currentLanguage,
  };
}

export default connect(mapStateToProps, {
  setShouldCurrentFileBeCleared,
})(FilePicker);
