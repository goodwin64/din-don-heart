import strings, {
  defaultLanguageCode,
} from '../components/LanguageSelector/localization';

import {
  SET_LANGUAGE,
  SET_CURRENT_IMAGE,
  SET_CURRENT_FILE_SHOULD_BE_CLEARED,
  SET_ECG_RESULT_VISIBILITY,
} from '../constants/actionTypes';

export const appInitialState = {
  shouldCurrentFileBeCleared: false,
  currentImage: null,
  currentLanguage: strings.getLanguage() || defaultLanguageCode,
  isEcgResultVisible: false,
};

export default function appCommonParamsReducer(state = appInitialState, action = {}) {
  switch (action.type) {
    case SET_ECG_RESULT_VISIBILITY: {
      return {
        ...state,
        isEcgResultVisible: action.payload,
      };
    }

    case SET_CURRENT_FILE_SHOULD_BE_CLEARED: {
      return {
        ...state,
        shouldCurrentFileBeCleared: action.payload,
      };
    }

    case SET_CURRENT_IMAGE: {
      return {
        ...state,
        currentImage: action.payload,
      };
    }

    case SET_LANGUAGE: {
      return {
        ...state,
        currentLanguage: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
