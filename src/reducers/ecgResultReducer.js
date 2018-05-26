import {
  RESET_DISEASE_RESULT_FULLY,
  RESET_DISEASE_RESULT_LOCAL_ANALYSIS,
  RESET_DISEASE_RESULT_SERVER_ANALYSIS,
  SET_DISEASE_RESULT_LOCAL_ANALYSIS,
  SET_DISEASE_RESULT_SERVER_ANALYSIS,
} from '../constants/actionTypes';

const initialStateLocalAnalysis = {
  baseLineY: 0,
  cellsSize: 0,
  ecgLetters: '',
  ecgLettersDetailed: '',
  plotIndices: [],
};

const initialStateServerAnalysis = {
  diseaseResult: '',
};

export const ecgResultInitialState = {
  ...initialStateLocalAnalysis,
  ...initialStateServerAnalysis,
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

    case RESET_DISEASE_RESULT_FULLY: {
      return ecgResultInitialState;
    }

    default: {
      return state;
    }
  }
}
