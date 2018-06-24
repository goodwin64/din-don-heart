import {
  abc,
  DISEASE_MESSAGE_DEATH,
  DISEASE_MESSAGE_HEALTHY,
  DISEASE_MESSAGE_TOO_SHORT,
  MIN_ECG_LENGTH,
} from '../constants/constants';

export default function getDisease(ecgLetters) {
  const lettersList = (
    Array.isArray(ecgLetters)
      ? ecgLetters
      : ecgLetters.split('')
  );
  const { length: lettersCount } = lettersList;
  const ecgInNumberRepresentation = lettersList.map(letter => abc.indexOf(letter));
  const [maxLetter, minLetter] = [
    Math.max.apply(null, ecgInNumberRepresentation),
    Math.min.apply(null, ecgInNumberRepresentation),
  ];

  if (maxLetter - minLetter < 2) {
    return {
      description: DISEASE_MESSAGE_DEATH,
      mark: DISEASE_MESSAGE_DEATH,
    };
  }
  if (lettersCount < MIN_ECG_LENGTH) {
    return {
      description: DISEASE_MESSAGE_TOO_SHORT,
      mark: DISEASE_MESSAGE_TOO_SHORT,
    };
  }

  return {
    description: DISEASE_MESSAGE_HEALTHY,
    mark: DISEASE_MESSAGE_HEALTHY,
  };
}
