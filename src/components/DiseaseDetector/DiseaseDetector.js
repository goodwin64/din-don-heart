import { Component } from 'react';
import { connect } from 'react-redux';

import {
  ecgLettersPT,
  onDiseaseResultPT,
} from '../../helpers/proptypes.helper';
import getDisease from '../../helpers/getDisease';
import { onDiseaseResultServerAnalysis } from '../../actions/onDiseaseResult';

const wait = seconds => new Promise(resolve => setTimeout(resolve, seconds));

class DiseaseDetector extends Component {
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
    const fakeServerResponse = wait(0).then(() => ({ json: () => getDisease(ecgLettersDetailed) }));
    const realServerResponse = fetch(`https://randomuser.me/api/?results=10&ecgLetters=${ecgLettersDetailed}`);

    Promise.race([
      fakeServerResponse,
      realServerResponse,
    ]).then(result => result.json())
      .then((result) => {
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
