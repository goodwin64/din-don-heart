import random from 'lodash.random';

import getDisease from './getDisease';
import {
  DISEASE_MESSAGE_DEATH,
  DISEASE_MESSAGE_TOO_SHORT,
  MIN_ECG_LENGTH,
} from '../constants/constants';

describe('getDisease method', () => {
  it('should detect death', () => {
    expect(getDisease('KKKKKKLLLLLL')).toEqual(DISEASE_MESSAGE_DEATH);
  });

  it('should detect too short ECG', () => {
    expect(getDisease('ABC')).toEqual(DISEASE_MESSAGE_TOO_SHORT);
  });

  it('should detect healthy ECG', () => {
    const mockAbc = 'ABXYZ';
    const randomLongEcgList = new Array(MIN_ECG_LENGTH + 1)
      .fill(0)
      .map(() => mockAbc[random(0, 4)]);

    const randomLongEcgString = randomLongEcgList.join('');

    expect(getDisease(randomLongEcgList)).toEqual(`You're healthy! (${MIN_ECG_LENGTH + 1})`);
    expect(getDisease(randomLongEcgString)).toEqual(`You're healthy! (${MIN_ECG_LENGTH + 1})`);
  });
});
