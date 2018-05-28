import React from 'react';
import { shallow } from 'enzyme';
import LocalizedStrings from 'react-localization';

import { App } from './App';
import MockWorker from '../../mocks/MockWorker';
import EcgResults from '../EcgResults/EcgResults';
import { AppDescription } from './App.styled';
import DiseaseDetectorHOC from '../DiseaseDetector/DiseaseDetector';

describe('App component', () => {
  let wrapper;
  let mockProps;
  let mockWorkerInstance;
  let spySetCurrentImage;
  let spySetEcgResultVisibility;
  let spyOnDiseaseResultLocalAnalysis;

  const mockLocalization = new LocalizedStrings({
    en: {
      appDescription: 'heart',
    },
    ru: {
      appDescription: 'сердце',
    },
  });

  beforeEach(() => {
    spySetCurrentImage = jest.fn();
    spySetEcgResultVisibility = jest.fn();
    spyOnDiseaseResultLocalAnalysis = jest.fn();

    mockWorkerInstance = new MockWorker('');

    mockProps = {
      ecgLetters: '',
      ecgLettersDetailed: '',
      localization: mockLocalization,
      isEcgResultVisible: true,
      imageParsingWorker: mockWorkerInstance,
      setCurrentImage: spySetCurrentImage,
      setEcgResultVisibility: spySetEcgResultVisibility,
      onDiseaseResultLocalAnalysis: spyOnDiseaseResultLocalAnalysis,
    };
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
});
