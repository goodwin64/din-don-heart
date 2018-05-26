import appCommonParamsReducer, { appInitialState } from './appCommonParamsReducer';
import { SET_CURRENT_FILE_SHOULD_BE_CLEARED, SET_CURRENT_IMAGE, SET_LANGUAGE } from '../constants/actionTypes';

describe('appCommonParamsReducer', () => {
  const mockStateBefore = {
    shouldCurrentFileBeCleared: true,
    currentImage: { data: 1 },
    currentLanguage: 'Lang 123',
    isEcgResultVisible: true,
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
      shouldCurrentFileBeCleared: true,
      currentImage: { data: 1 },
      currentLanguage: 'Lang 123',
      isEcgResultVisible: true,
    };
    expect(appCommonParamsReducer(mockStateBefore, {
      type: SET_CURRENT_FILE_SHOULD_BE_CLEARED,
      payload: true,
    })).toEqual(mockStateAfter);

    mockStateAfter = {
      shouldCurrentFileBeCleared: false,
      currentImage: { data: 1 },
      currentLanguage: 'Lang 123',
      isEcgResultVisible: true,
    };
    expect(appCommonParamsReducer(mockStateBefore, {
      type: SET_CURRENT_FILE_SHOULD_BE_CLEARED,
      payload: false,
    })).toEqual(mockStateAfter);
  });

  it('should update language properly', () => {
    mockStateAfter = {
      shouldCurrentFileBeCleared: true,
      currentImage: { data: 1 },
      currentLanguage: 'Lang 999',
      isEcgResultVisible: true,
    };

    expect(appCommonParamsReducer(mockStateBefore, {
      type: SET_LANGUAGE,
      payload: 'Lang 999',
    })).toEqual(mockStateAfter);
  });

  it('should update ecg image', () => {
    mockStateAfter = {
      shouldCurrentFileBeCleared: true,
      currentImage: { data: 2 },
      currentLanguage: 'Lang 123',
      isEcgResultVisible: true,
    };
    expect(appCommonParamsReducer(mockStateBefore, {
      type: SET_CURRENT_IMAGE,
      payload: { data: 2 },
    })).toEqual(mockStateAfter);
  });
});
