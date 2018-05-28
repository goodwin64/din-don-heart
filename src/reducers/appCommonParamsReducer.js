import strings, { defaultLanguageCode } from '../components/LanguageSelector/localization';

import {
  SET_LOCALIZATION,
} from '../constants/actionTypes';

import initImageParsingWorker from '../helpers/image-parsing.helper';

export const appInitialState = {
  currentLanguage: strings.getLanguage() || defaultLanguageCode,
  localization: { ...strings },
  imageParsingWorker: initImageParsingWorker(),
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

    default: {
      return state;
    }
  }
}
