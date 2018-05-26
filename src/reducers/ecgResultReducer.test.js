import ecgResultReducer, { ecgResultInitialState } from './ecgResultReducer';
import {
  RESET_DISEASE_RESULT_FULLY,
  RESET_DISEASE_RESULT_LOCAL_ANALYSIS,
  RESET_DISEASE_RESULT_SERVER_ANALYSIS,
  SET_DISEASE_RESULT_LOCAL_ANALYSIS,
  SET_DISEASE_RESULT_SERVER_ANALYSIS,
} from '../constants/actionTypes';

describe('ecgResultReducer', () => {
  const mockStateBefore = {
    baseLineY: 25,
    cellsSize: 20,
    ecgLetters: 'ABC',
    ecgLettersDetailed: 'ABCD',
    plotIndices: [1, 2, 3],
    diseaseResult: '123',
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
      baseLineY: 0,
      cellsSize: 0,
      ecgLetters: '',
      ecgLettersDetailed: '',
      plotIndices: [],
      diseaseResult: '123',
    };

    expect(ecgResultReducer(mockStateBefore, {
      type: RESET_DISEASE_RESULT_LOCAL_ANALYSIS,
    })).toEqual(mockStateAfter);
  });

  it('should reset params from server analysis', () => {
    mockStateAfter = {
      baseLineY: 25,
      cellsSize: 20,
      ecgLetters: 'ABC',
      ecgLettersDetailed: 'ABCD',
      plotIndices: [1, 2, 3],
      diseaseResult: '',
    };

    expect(ecgResultReducer(mockStateBefore, {
      type: RESET_DISEASE_RESULT_SERVER_ANALYSIS,
    })).toEqual(mockStateAfter);
  });

  it('should set params from local analysis, keeping server analysis results untouched', () => {
    mockStateAfter = {
      baseLineY: 125,
      cellsSize: 120,
      ecgLetters: 'XYZ',
      ecgLettersDetailed: 'WXYZ',
      plotIndices: [1, 2, 3, 4],
      diseaseResult: '123',
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
      baseLineY: 25,
      cellsSize: 20,
      ecgLetters: 'ABC',
      ecgLettersDetailed: 'ABCD',
      plotIndices: [1, 2, 3],
      diseaseResult: 'You are healthy',
    };

    expect(ecgResultReducer(mockStateBefore, {
      type: SET_DISEASE_RESULT_SERVER_ANALYSIS,
      payload: 'You are healthy',
    })).toEqual(mockStateAfter);
  });
});
