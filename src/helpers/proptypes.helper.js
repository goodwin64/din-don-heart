import PropTypes from 'prop-types';

// primitives
export const ecgLettersPT = PropTypes.string;
export const diseaseResultPT = PropTypes.string;
export const plotIndexPT = PropTypes.number;
export const baseLineYPT = PropTypes.number;
export const cellsSizePT = PropTypes.number;

// complex shapes
export const plotIndicesPT = PropTypes.arrayOf(plotIndexPT);

export const imageParsingWorkerPT = PropTypes.shape({
  setOnMessageHandler: PropTypes.func.isRequired,
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

// dispatchers (connected via mapDispatchToProps)
export const onDiseaseResultPT = PropTypes.func;
export const onDiseaseResultLocalAnalysisPT = PropTypes.func;
export const setEcgResultVisibilityPT = PropTypes.func;
export const setCurrentImagePT = PropTypes.func;
export const setShouldCurrentFileBeClearedPT = PropTypes.func;
export const setLanguagePT = PropTypes.func;
