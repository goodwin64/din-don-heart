import React from 'react';
import { shallow } from 'enzyme';
import LocalizedStrings from 'react-localization';

import { App } from './Home';
import MockWorker from '../../mocks/MockWorker';
import EcgResults from '../EcgResults/EcgResults';
import { AppDescription } from './Home.styled';
import DiseaseDetectorHOC from '../DiseaseDetector/DiseaseDetector';
import EcgAnalysisExample from '../EcgAnalysisExample/EcgAnalysisExample';

describe('Home component', () => {
  let wrapper;
  let mockProps;
  let mockWorkerInstance;
  const spies = {};

  const mockLocalization = new LocalizedStrings({
    en: {
      appDescription: 'heart',
    },
    ru: {
      appDescription: 'сердце',
    },
  });

  beforeEach(() => {
    spies.spyResetEcgResult = jest.fn();
    spies.spySetCurrentImage = jest.fn();
    spies.setEcgResultVisibility = jest.fn();
    spies.setEcgExamplesVisibility = jest.fn();
    spies.onDiseaseResultLocalAnalysis = jest.fn();

    mockWorkerInstance = new MockWorker('');

    mockProps = {
      ecgLetters: '',
      ecgLettersDetailed: '',
      localization: mockLocalization,
      isEcgResultVisible: true,
      areEcgExamplesVisible: false,
      imageParsingWorker: mockWorkerInstance,
      resetEcgResult: spies.spyResetEcgResult,
      setCurrentImage: spies.spySetCurrentImage,
      setEcgResultVisibility: spies.setEcgResultVisibility,
      setEcgExamplesVisibility: spies.setEcgExamplesVisibility,
      onDiseaseResultLocalAnalysis: spies.onDiseaseResultLocalAnalysis,
    };
  });

  afterEach(() => {
    wrapper = null;
  });

  it('ECG results are visible/hidden', () => {
    wrapper = shallow(<App {...mockProps} />);

    wrapper.setProps({
      isEcgResultVisible: true,
    });
    expect(wrapper.find(EcgResults).length).toEqual(1);

    wrapper.setProps({
      isEcgResultVisible: false,
    });
    expect(wrapper.find(EcgResults).length).toEqual(0);
  });

  it('should create "onMessage" handler in worker when component mounted', () => {
    expect(mockWorkerInstance.onmessage).not.toBeDefined();
    shallow(<App {...mockProps} />);
    expect(mockWorkerInstance.onmessage).toBeDefined();
  });

  it('should use current language based on localization', () => {
    wrapper = shallow(<App {...mockProps} />);
    expect(wrapper.find(AppDescription).render().text()).toEqual('heart');

    mockLocalization.setLanguage('ru');
    wrapper.setProps({});

    expect(wrapper.find(AppDescription).render().text()).toEqual('сердце');
  });

  it('should add DiseaseDetector only after local analysis (ECG letters are present)', () => {
    wrapper = shallow(<App {...mockProps} />);
    expect(wrapper.find(DiseaseDetectorHOC).length).toEqual(0);

    wrapper.setProps({
      ecgLetters: 'ABC',
    });
    expect(wrapper.find(DiseaseDetectorHOC).length).toEqual(1);
  });

  it('should reset ecg result when error data came from worker', () => {
    const errorResponseFromWorker = { data: { error: { errorMessage: 'Mock error from worker' } } };
    expect(spies.spyResetEcgResult).not.toBeCalled();
    shallow(<App {...mockProps} />);
    mockWorkerInstance.postMessage(errorResponseFromWorker);
    expect(spies.spyResetEcgResult).toBeCalled();
  });

  it('should show/hide ecg examples', () => {
    wrapper = shallow(<App {...mockProps} />);
    expect(wrapper.find(EcgAnalysisExample).length).toBe(0);

    wrapper.setProps({ areEcgExamplesVisible: true });
    expect(wrapper.find(EcgAnalysisExample).length).toBe(1);
  });
});
