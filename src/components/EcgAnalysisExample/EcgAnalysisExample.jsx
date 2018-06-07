import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { ExampleImage, ExampleImageContainer, ExamplesContainer } from './EcgAnalysisExample.styled';
import { resetEcgResult } from '../../actions/actions';
import { imageParsingWorkerPT, resetEcgResultPT } from '../../helpers/proptypes.helper';

export class EcgAnalysisExampleDumb extends PureComponent {
  static propTypes = {
    imageParsingWorker: imageParsingWorkerPT.isRequired,
    resetEcgResult: resetEcgResultPT.isRequired,
  };

  onExampleSelect = (event) => {
    const img = event.target;
    if (img && img.src) {
      fetch(img.src)
        .then(resp => resp.blob())
        .then((blob) => {
          this.props.imageParsingWorker.postMessage({ file: blob });
        });
    } else {
      this.props.resetEcgResult();
    }
  };

  render() {
    return (
      <ExamplesContainer onClick={this.onExampleSelect}>
        <ExampleImageContainer>
          <ExampleImage src="./ECG-1.jpg" alt="ECG-1 - before" />
        </ExampleImageContainer>

        <ExampleImageContainer>
          <ExampleImage src="./ECG-2.jpg" alt="ECG-2 - before" />
        </ExampleImageContainer>

        <ExampleImageContainer>
          <ExampleImage src="./ECG-3.jpg" alt="ECG-3 - before" />
        </ExampleImageContainer>
      </ExamplesContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    imageParsingWorker: state.appCommonParams.imageParsingWorker,
  };
}

export default connect(mapStateToProps, {
  resetEcgResult,
})(EcgAnalysisExampleDumb);
