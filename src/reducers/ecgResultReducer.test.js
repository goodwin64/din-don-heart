import ecgResultReducer, { ecgResultInitialState, initialStateLocalAnalysis } from './ecgResultReducer';
import {
  RESET_DISEASE_RESULT_FULLY,
  RESET_DISEASE_RESULT_LOCAL_ANALYSIS,
  RESET_DISEASE_RESULT_SERVER_ANALYSIS,
  SET_CURRENT_IMAGE,
  SET_DISEASE_RESULT_LOCAL_ANALYSIS,
  SET_DISEASE_RESULT_SERVER_ANALYSIS,
  SET_ECG_RESULT_VISIBILITY,
} from '../constants/actionTypes';

describe('ecgResultReducer', () => {
  const mockStateBefore = {
    baseLineY: 25,
    cellsSize: 20,
    ecgLetters: 'ABC',
    ecgLettersDetailed: 'ABCD',
    plotIndices: [1, 2, 3],
    diseaseResult: '123',
    currentImage: { data: 1 },
    isEcgResultVisible: false,
  };
  let mockStateAfter;

  it('should not change state if no action passed', () => {
    expect(ecgResultReducer(mockStateBefore)).toBe(mockStateBefore);
  });

  it('should not change state if action with unknown type passed', () => {
    expect(ecgResultReducer(mockStateBefore, {
      type: 'UNKNOWN',
    })).toBe(mockStateBefore);
  });

  it('should return initial state on init (no state passed to the reducer as well as no action)', () => {
    expect(ecgResultReducer()).toBe(ecgResultInitialState);
  });

  it('should return initial state on RESET FULL action', () => {
    expect(ecgResultReducer(mockStateBefore, {
      type: RESET_DISEASE_RESULT_FULLY,
    })).toBe(ecgResultInitialState);
  });

  it('should reset params from local analysis', () => {
    mockStateAfter = {
      ...mockStateBefore,
      ...initialStateLocalAnalysis,
    };

    expect(ecgResultReducer(mockStateBefore, {
      type: RESET_DISEASE_RESULT_LOCAL_ANALYSIS,
    })).toEqual(mockStateAfter);
  });

  it('should reset params from server analysis', () => {
    mockStateAfter = {
      ...mockStateBefore,
      diseaseResult: '',
    };

    expect(ecgResultReducer(mockStateBefore, {
      type: RESET_DISEASE_RESULT_SERVER_ANALYSIS,
    })).toEqual(mockStateAfter);
  });

  it('should set params from local analysis, keeping server analysis results untouched', () => {
    mockStateAfter = {
      ...mockStateBefore,
      baseLineY: 125,
      cellsSize: 120,
      ecgLetters: 'XYZ',
      ecgLettersDetailed: 'WXYZ',
      plotIndices: [1, 2, 3, 4],
    };

    expect(ecgResultReducer(mockStateBefore, {
      type: SET_DISEASE_RESULT_LOCAL_ANALYSIS,
      payload: {
        baseLineY: 125,
        cellsSize: 120,
        ecgLetters: 'XYZ',
        ecgLettersDetailed: 'WXYZ',
        plotIndices: [1, 2, 3, 4],
      },
    })).toEqual(mockStateAfter);
  });

  it('should set params from server analysis, keeping local analysis results untouched', () => {
    mockStateAfter = {
      ...mockStateBefore,
      diseaseResult: 'You are healthy',
    };

    expect(ecgResultReducer(mockStateBefore, {
      type: SET_DISEASE_RESULT_SERVER_ANALYSIS,
      payload: 'You are healthy',
    })).toEqual(mockStateAfter);
  });

  it('should update ecg image', () => {
    mockStateAfter = {
      ...mockStateBefore,
      currentImage: { data: 2 },
    };
    expect(ecgResultReducer(mockStateBefore, {
      type: SET_CURRENT_IMAGE,
      payload: { data: 2 },
    })).toEqual(mockStateAfter);
  });

  it('should show/hide ECG result', () => {
    const mockStateAfterShow = {
      ...mockStateBefore,
      isEcgResultVisible: true,
    };
    const mockStateAfterHide = {
      ...mockStateBefore,
      isEcgResultVisible: false,
    };

    expect(ecgResultReducer(mockStateBefore, {
      type: SET_ECG_RESULT_VISIBILITY,
      payload: true,
    })).toEqual(mockStateAfterShow);

    expect(ecgResultReducer(mockStateAfterShow, {
      type: SET_ECG_RESULT_VISIBILITY,
      payload: false,
    })).toEqual(mockStateAfterHide);
  });
});
