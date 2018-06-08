import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import noop from '../../helpers/noop';
import { DiseaseDetector } from './DiseaseDetector';

// TODO: add async action and test it
describe('DiseaseDetector component', () => {
  // let mockDiseaseService;
  // let spySendEcgForAnalysis;
  // let spyOnDiseaseResult;

  beforeEach(() => {
    // spySendEcgForAnalysis = jest.fn();
    // spyOnDiseaseResult = jest.fn();
    // mockDiseaseService = class {
    //   constructor() {
    //     this.onDiseaseResult = spyOnDiseaseResult;
    //   }
    //
    //   sendEcgForAnalysis(params) {
    //     spySendEcgForAnalysis(params);
    //     this.onDiseaseResult();
    //   }
    // };
  });

  it('should render nothing', () => {
    const wrapper = shallow(<DiseaseDetector
      ecgLettersDetailed="A"
      onDiseaseResult={noop}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  // it('should run onDisease stuff after mount', () => {
  //   expect(spySendEcgForAnalysis).not.toBeCalled();
  //   expect(spyOnDiseaseResult).not.toBeCalled();
  //
  //   shallow(<DiseaseDetector
  //     ecgLettersDetailed="A"
  //     onDiseaseResult={noop}
  //     DiseaseService={mockDiseaseService}
  //   />);
  //
  //   expect(spySendEcgForAnalysis).toBeCalledWith('A');
  //   expect(spyOnDiseaseResult).toBeCalled();
  // });
  //
  // it('should not run onDisease stuff if ECG letters are the same', () => {
  //   expect(spySendEcgForAnalysis).not.toBeCalled();
  //   expect(spyOnDiseaseResult).not.toBeCalled();
  //
  //   const wrapper = shallow(<DiseaseDetector
  //     ecgLettersDetailed="A"
  //     onDiseaseResult={noop}
  //     DiseaseService={mockDiseaseService}
  //   />);
  //
  //   expect(spySendEcgForAnalysis).toHaveBeenCalledTimes(1);
  //   expect(spyOnDiseaseResult).toHaveBeenCalledTimes(1);
  //
  //   wrapper.setProps({
  //     ecgLettersDetailed: 'A',
  //   });
  //
  //   expect(spySendEcgForAnalysis).toHaveBeenCalledTimes(1);
  //   expect(spyOnDiseaseResult).toHaveBeenCalledTimes(1);
  //
  //   wrapper.setProps({
  //     ecgLettersDetailed: 'B',
  //   });
  //
  //   expect(spySendEcgForAnalysis).toBeCalledWith('B');
  //   expect(spySendEcgForAnalysis).toHaveBeenCalledTimes(2);
  //   expect(spyOnDiseaseResult).toHaveBeenCalledTimes(2);
  // });
});
