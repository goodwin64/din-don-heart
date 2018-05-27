import appCommonParamsReducer, { appInitialState } from './appCommonParamsReducer';
import {
  SET_CURRENT_FILE_SHOULD_BE_CLEARED,
  SET_CURRENT_IMAGE,
  SET_ECG_EXAMPLES_VISIBILITY,
  SET_LANGUAGE,
} from '../constants/actionTypes';

describe('appCommonParamsReducer', () => {
  const mockStateBefore = {
    shouldCurrentFileBeCleared: false,
    currentImage: null,
    currentLanguage: 'Lang 123',
    isEcgResultVisible: false,
    areEcgExamplesVisible: false,
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

  it('should update only the status whether current file should be cleared', () => {
    mockStateAfter = {
      ...mockStateBefore,
      shouldCurrentFileBeCleared: true,
    };
    expect(appCommonParamsReducer(mockStateBefore, {
      type: SET_CURRENT_FILE_SHOULD_BE_CLEARED,
      payload: true,
    })).toEqual(mockStateAfter);

    mockStateAfter = {
      ...mockStateBefore,
      shouldCurrentFileBeCleared: false,
    };
    expect(appCommonParamsReducer(mockStateBefore, {
      type: SET_CURRENT_FILE_SHOULD_BE_CLEARED,
      payload: false,
    })).toEqual(mockStateAfter);
  });

  it('should update language properly', () => {
    mockStateAfter = {
      ...mockStateBefore,
      currentLanguage: 'Lang 999',
    };

    expect(appCommonParamsReducer(mockStateBefore, {
      type: SET_LANGUAGE,
      payload: 'Lang 999',
    })).toEqual(mockStateAfter);
  });

  it('should update ecg image', () => {
    mockStateAfter = {
      ...mockStateBefore,
      currentImage: { data: 2 },
    };
    expect(appCommonParamsReducer(mockStateBefore, {
      type: SET_CURRENT_IMAGE,
      payload: { data: 2 },
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
