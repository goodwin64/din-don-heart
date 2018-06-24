import React from 'react';
import { shallow } from 'enzyme';

import {
  FilePicker,
} from './FilePicker';
import MockWorker from '../../mocks/MockWorker';
import {
  FilePickerInput,
  FilePickerLabelText,
} from './FilePicker.styled';
import noop from '../../helpers/noop';

describe('FilePicker component', () => {
  let spyOnMessage;
  let spyResetEcgResult;
  let mockWorker;
  let mockProps;
  let wrapper;
  let imageFile;
  let filePickerInputElem;

  beforeEach(() => {
    spyOnMessage = jest.fn();
    spyResetEcgResult = jest.fn();
    mockWorker = new MockWorker('url', spyOnMessage);
    mockProps = {
      imageParsingWorker: mockWorker,
      localization: { chooseFile: 'abc' },
      resetEcgResult: spyResetEcgResult,
      areEcgExamplesVisible: false,
      setEcgExamplesVisibility: noop, // TODO: add unit test for ECG example feature
    };
    wrapper = shallow(<FilePicker {...mockProps} />);

    imageFile = new Blob(['file contents'], { type: 'image/jpeg' });
    filePickerInputElem = wrapper.find(FilePickerInput);
  });

  it('should clear file input queue when file selection discarded', () => {
    expect(spyResetEcgResult).not.toBeCalled();
    filePickerInputElem.simulate('change', { target: { files: [] } });
    expect(spyResetEcgResult).toBeCalled();
  });

  // it('should trigger worker "postMessage" handler', () => {
  //   const imageWorkerPostMessageSpy = jest.spyOn(mockWorker, 'postMessage');
  //
  //   expect(imageWorkerPostMessageSpy).not.toBeCalled();
  //   filePickerInputElem.simulate('change', { target: { files: [imageFile] } });
  //   expect(imageWorkerPostMessageSpy).toBeCalled();
  // });

  it('should accept only images file type', () => {
    expect(filePickerInputElem.prop('accept')).toContain('image/');
  });

  it('should use localized text for file picker button', () => {
    const subject = wrapper.find(FilePickerLabelText);
    expect(subject.render().text()).toEqual('abc');
  });
});
