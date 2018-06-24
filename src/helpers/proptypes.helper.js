import PropTypes from 'prop-types';

// primitives
export const ecgLettersPT = PropTypes.string;
export const currentLanguagePT = PropTypes.string;
export const signedUpUsernamePT = PropTypes.string;
export const plotIndexPT = PropTypes.number;
export const cellsSizePT = PropTypes.number;
export const areEcgExamplesVisiblePT = PropTypes.bool;
export const isLoggedInPT = PropTypes.bool;
export const isLoginFetchingPT = PropTypes.bool;


// complex proptypes, shapes

export const localizationPT = PropTypes.shape({});

export const historyPT = PropTypes.shape({
  push: PropTypes.func,
});

export const userPT = PropTypes.shape({
  name: PropTypes.string,
  type: PropTypes.string,
});

export const diseaseResultPT = PropTypes.shape({
  cellsSize: PropTypes.number,
  description: PropTypes.string,
  mark: PropTypes.string,
  resultResources: PropTypes.array,
  source: PropTypes.string,
});

// dispatchers (connected via mapDispatchToProps)
export const userLogInPT = PropTypes.func;
export const userLogOutPT = PropTypes.func;
export const signUpUserPT = PropTypes.func;
export const userStartLoginPT = PropTypes.func;
export const onDiseaseResultPT = PropTypes.func;
export const onDiseaseResultLocalAnalysisPT = PropTypes.func;
export const setEcgResultVisibilityPT = PropTypes.func;
export const setEcgExamplesVisibilityPT = PropTypes.func;
export const resetEcgResultPT = PropTypes.func;
export const setLocalizationPT = PropTypes.func;
