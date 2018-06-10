import PropTypes from 'prop-types';

// primitives
export const ecgLettersPT = PropTypes.string;
export const diseaseResultPT = PropTypes.string;
export const currentLanguagePT = PropTypes.string;
export const plotIndexPT = PropTypes.number;
export const baseLineYPT = PropTypes.number;
export const cellsSizePT = PropTypes.number;
export const areEcgExamplesVisiblePT = PropTypes.bool;
export const isLoggedInPT = PropTypes.bool;
export const isLoginFetchingPT = PropTypes.bool;


// complex proptypes, shapes
export const plotIndicesPT = PropTypes.arrayOf(plotIndexPT);

export const imageParsingWorkerPT = PropTypes.shape({
  onmessage: PropTypes.func,
  postMessage: PropTypes.func.isRequired,
});

export const ecgResultPT = PropTypes.shape({
  baseLineY: baseLineYPT,
  cellsSize: cellsSizePT,
  ecgLetters: ecgLettersPT,
  ecgLettersDetailed: ecgLettersPT,
  plotIndices: plotIndicesPT,
  diseaseResult: diseaseResultPT,
});

export const localizationPT = PropTypes.shape({});

export const historyPT = PropTypes.shape({
  push: PropTypes.func,
});

// dispatchers (connected via mapDispatchToProps)
export const userLogInPT = PropTypes.func;
export const userLogOutPT = PropTypes.func;
export const userStartLoginPT = PropTypes.func;
export const onDiseaseResultPT = PropTypes.func;
export const onDiseaseResultLocalAnalysisPT = PropTypes.func;
export const setEcgResultVisibilityPT = PropTypes.func;
export const setEcgExamplesVisibilityPT = PropTypes.func;
export const setCurrentImagePT = PropTypes.func;
export const resetEcgResultPT = PropTypes.func;
export const setLocalizationPT = PropTypes.func;
