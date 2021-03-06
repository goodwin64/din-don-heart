import {
  RESET_DISEASE_RESULT_FULLY,
  RESET_DISEASE_RESULT_LOCAL_ANALYSIS,
  RESET_DISEASE_RESULT_SERVER_ANALYSIS,
  SET_DISEASE_RESULT_LOCAL_ANALYSIS,
  SET_DISEASE_RESULT_SERVER_ANALYSIS,
  SET_ECG_RESULT_VISIBILITY,
  USER_LOGGED_OUT,
} from '../constants/actionTypes';

export const initialStateLocalAnalysis = {
  baseLineY: 0,
  cellsSize: 0,
  ecgLetters: '',
  ecgLettersDetailed: '',
  plotIndices: [],
};

export const initialStateServerAnalysis = {
  diseaseResult: {},
};

export const ecgResultInitialState = {
  ...initialStateLocalAnalysis,
  ...initialStateServerAnalysis,
  isEcgResultVisible: false,
};

export default function ecgResultReducer(state = ecgResultInitialState, action = {}) {
  switch (action.type) {
    case SET_DISEASE_RESULT_LOCAL_ANALYSIS: {
      return {
        ...state,
        ...action.payload,
        diseaseResult: state.diseaseResult,
      };
    }

    case RESET_DISEASE_RESULT_LOCAL_ANALYSIS: {
      return {
        ...state,
        ...initialStateLocalAnalysis,
      };
    }

    case SET_DISEASE_RESULT_SERVER_ANALYSIS: {
      return {
        ...state,
        diseaseResult: action.payload,
      };
    }

    case RESET_DISEASE_RESULT_SERVER_ANALYSIS: {
      return {
        ...state,
        ...initialStateServerAnalysis,
      };
    }

    case USER_LOGGED_OUT:
    case RESET_DISEASE_RESULT_FULLY: {
      return ecgResultInitialState;
    }

    case SET_ECG_RESULT_VISIBILITY: {
      return {
        ...state,
        isEcgResultVisible: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
