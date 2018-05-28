import PropTypes from 'prop-types';

// primitives
export const ecgLettersPT = PropTypes.string;
export const diseaseResultPT = PropTypes.string;
export const currentLanguagePT = PropTypes.string;
export const plotIndexPT = PropTypes.number;
export const baseLineYPT = PropTypes.number;
export const cellsSizePT = PropTypes.number;

// complex shapes
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

// dispatchers (connected via mapDispatchToProps)
export const onDiseaseResultPT = PropTypes.func;
export const onDiseaseResultLocalAnalysisPT = PropTypes.func;
export const setEcgResultVisibilityPT = PropTypes.func;
export const setCurrentImagePT = PropTypes.func;
export const resetEcgResultPT = PropTypes.func;
export const setLocalizationPT = PropTypes.func;
