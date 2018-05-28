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
        // eslint-disable-next-line no-underscore-dangle
        currentLanguage: action.payload._language,
        localization: {
          ...state.localization,
          ...action.payload,
        },
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
