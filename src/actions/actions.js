import {
  SET_DISEASE_RESULT_LOCAL_ANALYSIS,
  SET_DISEASE_RESULT_SERVER_ANALYSIS,
  SET_ECG_RESULT_VISIBILITY,
  SET_LOCALIZATION,
  RESET_DISEASE_RESULT_FULLY,
  SET_ECG_EXAMPLES_VISIBILITY,
} from '../constants/actionTypes';

export function onDiseaseResultLocalAnalysis(ecgResult) {
  return {
    type: SET_DISEASE_RESULT_LOCAL_ANALYSIS,
    payload: ecgResult,
  };
}

export function onDiseaseResultServerAnalysis(ecgResult) {
  return {
    type: SET_DISEASE_RESULT_SERVER_ANALYSIS,
    payload: ecgResult,
  };
}

export function setEcgResultVisibility(isEcgResultVisible) {
  return {
    type: SET_ECG_RESULT_VISIBILITY,
    payload: isEcgResultVisible,
  };
}

export function setEcgExamplesVisibility(areEcgExamplesVisible) {
  return {
    type: SET_ECG_EXAMPLES_VISIBILITY,
    payload: areEcgExamplesVisible,
  };
}

export function setLocalization(localization) {
  return {
    type: SET_LOCALIZATION,
    payload: localization,
  };
}

export function resetEcgResult() {
  return {
    type: RESET_DISEASE_RESULT_FULLY,
  };
}
