import React from 'react';
import { shallow } from 'enzyme';

import { FilePicker } from './FilePicker';
import { FilePickerInput } from '../App/App.styled';
import MockWorker from '../../mocks/MockWorker';

describe('FilePicker component', () => {
  let spyOnMessage;
  let spyResetEcgResult;
  let mockWorker;
  let mockProps;
  let wrapper;
  let fileContents;
  let textFile;
  let filePickerInput;

  beforeEach(() => {
    spyOnMessage = jest.fn();
    spyResetEcgResult = jest.fn();
    mockWorker = new MockWorker('url', spyOnMessage);
    mockProps = {
      imageParsingWorker: mockWorker,
      localization: { chooseFile: 'abc' },
      spyResetEcgResult,
    };
    wrapper = shallow(<FilePicker {...mockProps} />);

    fileContents = 'file contents';
    textFile = new Blob([fileContents], { type: 'text/plain' });
    filePickerInput = wrapper.find(FilePickerInput);
  });

  it('should clear file input queue when file selected', () => {
    expect(spyResetEcgResult).not.toBeCalled();
    filePickerInput.simulate('change', { target: { files: [textFile] } });
    expect(spyResetEcgResult).toBeCalled();
  });

  it('should trigger worker "postMessage" handler', () => {
    const imageWorkerPostMessageSpy = jest.spyOn(mockWorker, 'postMessage');

    expect(imageWorkerPostMessageSpy).not.toBeCalled();
    filePickerInput.simulate('change', { target: { files: [textFile] } });
    expect(imageWorkerPostMessageSpy).toBeCalled();
  });

  it('should accept only images file type', () => {

  });

  it('should test file input handler', () => {

    filePickerInput.simulate('change', { target: { files: [textFile] } });
    expect(imageWorkerPostMessageSpy).toHaveBeenCalledTimes(1);
    expect(imageWorkerPostMessageSpy).toHaveBeenCalledWith({ file: textFile });

    filePickerInput.simulate('change', { target: { files: [] } });
    expect(imageWorkerPostMessageSpy).toHaveBeenCalledTimes(2);
    expect(imageWorkerPostMessageSpy).toHaveBeenCalledWith({ file: {} });
  });
});
