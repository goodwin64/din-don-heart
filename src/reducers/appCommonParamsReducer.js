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
        // eslint-disable-next-line no-underscore-dangle
        currentLanguage: action.payload._language,
        localization: {
          ...state.localization,
          ...action.payload,
        },
      };
    }

    default: {
      return state;
    }
  }
}
