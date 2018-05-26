import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FilePickerContainer, FilePickerInput, FilePickerLabel } from '../App/App.styled';
import strings from '../../helpers/localization';

const defaultFile = {};

class FilePicker extends Component {
  static propTypes = {
    shouldCurrentFileBeCleared: PropTypes.bool.isRequired,
    afterCurrentFileReset: PropTypes.func.isRequired,
    onFileChange: PropTypes.func.isRequired,
  };

  componentWillReceiveProps(props) {
    if (props.shouldCurrentFileBeCleared) {
      this.resetCurrentFile();
    }
  }

  onFileChange = (event) => {
    const file = event.target.files[0] || defaultFile;
    this.props.onFileChange(file);
  };

  resetCurrentFile = () => {
    this.filePicker.value = '';
    this.props.afterCurrentFileReset();
  };

  render() {
    return (
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
          <span role="img" aria-label={strings.chooseFile}>📁</span>
          {strings.chooseFile}
        </FilePickerLabel>
      </FilePickerContainer>
    );
  }
}

export default FilePicker;
