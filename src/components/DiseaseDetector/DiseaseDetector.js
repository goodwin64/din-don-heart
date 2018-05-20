import { Component } from 'react';

import { ecgLettersPT, onDiseaseResultPT } from '../../helpers/proptypes.helper';

const wait = seconds => new Promise(resolve => setTimeout(resolve, seconds));

class DiseaseDetector extends Component {
  static propTypes = {
    onDiseaseResult: onDiseaseResultPT.isRequired,
    ecgLetters: ecgLettersPT.isRequired,
  };

  componentDidMount() {
    this.sendEcgForAnalysis(this.props);
  }

  componentWillReceiveProps(props) {
    if (props.ecgLetters !== this.props.ecgLetters) {
      this.sendEcgForAnalysis(props);
    }
  }

  sendEcgForAnalysis = (props) => {
    const { ecgLetters, onDiseaseResult } = props;
    const fakeServerResponse = wait(0).then(() => ({ json: () => `You are healthy (${ecgLetters.length})` }));
    const realServerResponse = fetch(`https://randomuser.me/api/?results=10&ecgLetters=${ecgLetters}`);

    Promise.race([
      fakeServerResponse,
      realServerResponse,
    ]).then(result => result.json())
      .then((result) => {
        onDiseaseResult(JSON.stringify(result));
      })
      .catch((err) => {
        console.error('Error in DiseaseDetector', err);
      });
  };

  render() {
    return null;
  }
}

export default DiseaseDetector;
