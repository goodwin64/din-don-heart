import appCommonParamsReducer, { appInitialState } from './appCommonParamsReducer';
import { SET_LOCALIZATION } from '../constants/actionTypes';

describe('appCommonParamsReducer', () => {
  const mockStateBefore = {
    currentImage: { data: 1 },
    currentLanguage: 'Lang 123',
    isEcgResultVisible: true,
    localization: {},
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
    mockStateAfter = {
      ...mockStateBefore,
      currentLanguage: 'Lang 999',
    };

    expect(appCommonParamsReducer(mockStateBefore, {
      type: SET_LOCALIZATION,
      payload: 'Lang 999',
    })).toEqual(mockStateAfter);
  });
});
