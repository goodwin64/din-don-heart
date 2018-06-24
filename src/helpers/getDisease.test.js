import random from 'lodash.random';

import getDisease from './getDisease';
import {
  DISEASE_MESSAGE_DEATH,
  DISEASE_MESSAGE_TOO_SHORT,
  MIN_ECG_LENGTH,
} from '../constants/constants';

describe('getDisease method', () => {
  it('should detect death', () => {
    expect(getDisease('KKKKKKLLLLLL')).toEqual({
      description: DISEASE_MESSAGE_DEATH,
      mark: DISEASE_MESSAGE_DEATH,
    });
  });

  it('should detect too short ECG', () => {
    const shortEcgResult = {
      description: DISEASE_MESSAGE_TOO_SHORT,
      mark: DISEASE_MESSAGE_TOO_SHORT,
    };
    expect(getDisease('ABC')).toEqual(shortEcgResult);
  });

  it('should detect healthy ECG', () => {
    const mockAbc = 'ABXYZ';
    const randomLongEcgList = new Array(MIN_ECG_LENGTH + 1)
      .fill(0)
      .map(() => mockAbc[random(0, 4)]);

    const randomLongEcgString = randomLongEcgList.join('');
    const healthyEcgResult = {
      description: "You're healthy!",
      mark: "You're healthy!",
    };

    expect(getDisease(randomLongEcgList)).toEqual(healthyEcgResult);
    expect(getDisease(randomLongEcgString)).toEqual(healthyEcgResult);
  });
});
