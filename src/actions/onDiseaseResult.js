import {
  SET_CURRENT_IMAGE,
  SET_CURRENT_FILE_SHOULD_BE_CLEARED,
  SET_DISEASE_RESULT_LOCAL_ANALYSIS,
  SET_DISEASE_RESULT_SERVER_ANALYSIS,
  SET_ECG_RESULT_VISIBILITY, SET_LANGUAGE,
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

export function setShouldCurrentFileBeCleared(payload) {
  return {
    type: SET_CURRENT_FILE_SHOULD_BE_CLEARED,
    payload,
  };
}

export function setLanguage(language) {
  return {
    type: SET_LANGUAGE,
    payload: language,
  };
}
