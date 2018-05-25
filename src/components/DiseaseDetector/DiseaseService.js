import getDisease from '../../helpers/getDisease';

const wait = seconds => new Promise(resolve => setTimeout(resolve, seconds));

export default class DiseaseService {
  constructor(onDiseaseResult) {
    this.onDiseaseResult = onDiseaseResult;
  }

  sendEcgForAnalysis = (ecgLettersDetailed) => {
    const fakeServerResponse = wait(0).then(() => ({ json: () => getDisease(ecgLettersDetailed) }));
    const realServerResponse = fetch(`https://randomuser.me/api/?results=10&ecgLetters=${ecgLettersDetailed}`);

    Promise.race([
      fakeServerResponse,
      realServerResponse,
    ]).then(result => result.json())
      .then((result) => {
        this.onDiseaseResult(JSON.stringify(result));
      })
      .catch((err) => {
        console.error('Error in DiseaseService', err);
      });
  };
}
