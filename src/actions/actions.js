import {
  SET_CURRENT_IMAGE,
  SET_DISEASE_RESULT_LOCAL_ANALYSIS,
  SET_DISEASE_RESULT_SERVER_ANALYSIS,
  SET_ECG_RESULT_VISIBILITY,
  SET_LOCALIZATION,
  RESET_DISEASE_RESULT_FULLY,
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

export function setCurrentImage(image) {
  return {
    type: SET_CURRENT_IMAGE,
    payload: image,
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
