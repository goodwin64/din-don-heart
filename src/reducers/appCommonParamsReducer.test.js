import appCommonParamsReducer, { appInitialState } from './appCommonParamsReducer';
import {
  SET_LOCALIZATION,
  SET_ECG_EXAMPLES_VISIBILITY,
} from '../constants/actionTypes';

describe('appCommonParamsReducer', () => {
  const mockStateBefore = {
    currentLanguage: 'Lang 123',
    areEcgExamplesVisible: false,
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

  it('should show/hide ecg examples', () => {
    const mockStateExamplesHidden = mockStateBefore;
    const mockStateExamplesVisible = {
      ...mockStateBefore,
      areEcgExamplesVisible: true,
    };

    expect(appCommonParamsReducer(mockStateExamplesHidden, {
      type: SET_ECG_EXAMPLES_VISIBILITY,
      payload: true,
    })).toEqual(mockStateExamplesVisible);

    expect(appCommonParamsReducer(mockStateExamplesHidden, {
      type: SET_ECG_EXAMPLES_VISIBILITY,
      payload: false,
    })).toEqual(mockStateExamplesHidden);

    expect(appCommonParamsReducer(mockStateExamplesVisible, {
      type: SET_ECG_EXAMPLES_VISIBILITY,
      payload: false,
    })).toEqual(mockStateExamplesHidden);

    expect(appCommonParamsReducer(mockStateExamplesVisible, {
      type: SET_ECG_EXAMPLES_VISIBILITY,
      payload: true,
    })).toEqual(mockStateExamplesVisible);
  });
});
