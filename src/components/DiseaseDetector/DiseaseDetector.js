import { Component } from 'react';
import { connect } from 'react-redux';

import {
  cellsSizePT,
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
    cellsSize: cellsSizePT.isRequired,
    ecgLettersDetailed: ecgLettersPT.isRequired,
    onDiseaseResult: onDiseaseResultPT.isRequired,
  };

  componentDidMount() {
    this.sendEcgForAnalysis(this.props.ecgLettersDetailed, this.props.cellsSize);
  }

  componentWillReceiveProps(props) {
    if (props.ecgLettersDetailed !== this.props.ecgLettersDetailed) {
      this.sendEcgForAnalysis(props.ecgLettersDetailed, props.cellsSize);
    }
  }

  sendEcgForAnalysis = (ecgLettersDetailed, cellsSize) => {
    const fakeServerResponse = wait(1).then(() => getDisease(ecgLettersDetailed));
    const realServerResponse = getData('http://176.38.3.120', {
      ecgletters: ecgLettersDetailed,
      cellcount: cellsSize,
    })
      .catch(() => wait(Infinity));

    Promise.race([
      fakeServerResponse,
      realServerResponse,
    ])
      .then((result) => {
        this.props.onDiseaseResult(result);
      })
      .catch((err) => {
        console.error('Error in Disease Detector', err);
      });
  };

  render() {
    return null;
  }
}

function mapStateToProps(state) {
  return {
    cellsSize: state.ecgResult.cellsSize,
    ecgLettersDetailed: state.ecgResult.ecgLettersDetailed,
  };
}

export default connect(mapStateToProps, {
  onDiseaseResult: onDiseaseResultServerAnalysis,
})(DiseaseDetector);
