import {
  abc,
  DISEASE_MESSAGE_DEATH,
  DISEASE_MESSAGE_HEALTHY,
  DISEASE_MESSAGE_TOO_SHORT,
  MIN_ECG_LENGTH,
} from '../constants';

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
    return DISEASE_MESSAGE_DEATH;
  }
  if (lettersCount < MIN_ECG_LENGTH) {
    return DISEASE_MESSAGE_TOO_SHORT;
  }

  return `${DISEASE_MESSAGE_HEALTHY} (${lettersCount})`;
}
