import { Component } from 'react';

import {
  DiseaseServicePT,
  ecgLettersPT,
  onDiseaseResultPT,
} from '../../helpers/proptypes.helper';
import DiseaseService from './DiseaseService';

class DiseaseDetector extends Component {
  static propTypes = {
    onDiseaseResult: onDiseaseResultPT.isRequired,
    ecgLettersDetailed: ecgLettersPT.isRequired,
    DiseaseService: DiseaseServicePT,
  };

  static defaultProps = {
    DiseaseService,
  };

  constructor(props) {
    super(props);
    this.diseaseService = new props.DiseaseService(props.onDiseaseResult);
  }

  componentDidMount() {
    this.diseaseService.sendEcgForAnalysis(this.props.ecgLettersDetailed);
  }

  componentWillReceiveProps(props) {
    if (props.ecgLettersDetailed !== this.props.ecgLettersDetailed) {
      this.diseaseService.sendEcgForAnalysis(props.ecgLettersDetailed);
    }
  }

  render() {
    return null;
  }
}

export default DiseaseDetector;
