import strings, {
  defaultLanguageCode,
} from '../components/LanguageSelector/localization';

import {
  SET_LOCALIZATION,
  SET_CURRENT_IMAGE,
  SET_ECG_EXAMPLES_VISIBILITY,
} from '../constants/actionTypes';

import initImageParsingWorker from '../helpers/image-parsing.helper';

export const appInitialState = {
  currentLanguage: strings.getLanguage() || defaultLanguageCode,
  localization: { ...strings },
  imageParsingWorker: initImageParsingWorker(),
  areExamplesVisible: false,
};

export default function appCommonParamsReducer(state = appInitialState, action = {}) {
  switch (action.type) {
    case SET_LOCALIZATION: {
      return {
        ...state,
        currentLanguage: action.payload.getLanguage(),
        localization: { ...action.payload },
      };
    }

    case SET_ECG_EXAMPLES_VISIBILITY: {
      return {
        ...state,
        areEcgExamplesVisible: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
