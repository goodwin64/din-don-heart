import { Component } from 'react';
import { connect } from 'react-redux';

import {
  ecgLettersPT,
  onDiseaseResultPT,
} from '../../helpers/proptypes.helper';
import getDisease from '../../helpers/getDisease';
import { onDiseaseResultServerAnalysis } from '../../actions/actions';
// import postData from '../../helpers/postData';
import getData from '../../helpers/getData';

const wait = seconds => new Promise(resolve => setTimeout(resolve, seconds));

export class DiseaseDetector extends Component {
  static propTypes = {
    ecgLettersDetailed: ecgLettersPT.isRequired,
    onDiseaseResult: onDiseaseResultPT.isRequired,
  };

  componentDidMount() {
    this.sendEcgForAnalysis(this.props.ecgLettersDetailed);
  }

  componentWillReceiveProps(props) {
    if (props.ecgLettersDetailed !== this.props.ecgLettersDetailed) {
      this.sendEcgForAnalysis(props.ecgLettersDetailed);
    }
  }

  sendEcgForAnalysis = (ecgLettersDetailed) => {
    const fakeServerResponse = wait(500).then(() => getDisease(ecgLettersDetailed));
    const realServerResponse = getData('/fakeEcgResponses/response1.json');

    Promise.race([
      fakeServerResponse,
      realServerResponse,
    ]).then((result) => {
      const resultStringified = JSON.stringify(result);
      this.props.onDiseaseResult(resultStringified);
    })
      .catch((err) => {
        console.error('Error in Disease Detector', err);
      });
  };

  render() {
    return null;
  }
}

export default connect(null, {
  onDiseaseResult: onDiseaseResultServerAnalysis,
})(DiseaseDetector);
