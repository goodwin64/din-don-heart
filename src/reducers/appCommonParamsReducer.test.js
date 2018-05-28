import appCommonParamsReducer, { appInitialState } from './appCommonParamsReducer';
import { SET_LOCALIZATION } from '../constants/actionTypes';

describe('appCommonParamsReducer', () => {
  const mockStateBefore = {
    currentImage: { data: 1 },
    currentLanguage: 'Lang 123',
    isEcgResultVisible: true,
    localization: {
      _language: 'Lang 123',
      anotherLanguageField: 'mock value',
    },
  };
  let mockStateAfter;

  it('should return initial state on init (no state passed to the reducer as well as no action)', () => {
    expect(appCommonParamsReducer()).toBe(appInitialState);
  });

  it('should return state as is if unknow type action was passed', () => {
    expect(appCommonParamsReducer(null, {
      type: 'UNKNOWN',
    })).toBe(null);

    expect(appCommonParamsReducer(mockStateBefore, {
      type: 'UNKNOWN',
    })).toBe(mockStateBefore);
  });

  it('should update language properly', () => {
    const payload = { _language: 'Lang 987' };
    mockStateAfter = {
      ...mockStateBefore,
      currentLanguage: 'Lang 987',
      localization: {
        ...mockStateBefore.localization,
        ...payload,
      },
    };

    expect(appCommonParamsReducer(mockStateBefore, {
      type: SET_LOCALIZATION,
      payload,
    })).toEqual(mockStateAfter);
  });
});
