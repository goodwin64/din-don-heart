import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import { App } from './App';

describe('App component', () => {
  let mockWorker;

  beforeEach(() => {
    mockWorker = {
      postMessage: () => {},
      setOnMessageHandler: (handler) => { mockWorker.onmessage = handler; },
    };
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App imageParsingWorker={mockWorker} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('enzyme should work properly', () => {
    const wrapper = shallow(<p>Motto (slogan)</p>);
    expect(wrapper.text()).toEqual('Motto (slogan)');
  });

  it('should test file input handler', () => {
    const AppWrapper = shallow(<App imageParsingWorker={mockWorker} />);
    const fileContents = 'file contents';
    const textFile = new Blob([fileContents], { type: 'text/plain' });
    const imageWorkerPostMessageSpy = jest.spyOn(mockWorker, 'postMessage');

    AppWrapper.find('input').simulate('change', { target: { files: [textFile] } });
    expect(imageWorkerPostMessageSpy).toHaveBeenCalledTimes(1);
    expect(imageWorkerPostMessageSpy).toHaveBeenCalledWith({ file: textFile });

    AppWrapper.find('input').simulate('change', { target: { files: [] } });
    expect(imageWorkerPostMessageSpy).toHaveBeenCalledTimes(2);
    expect(imageWorkerPostMessageSpy).toHaveBeenCalledWith({ file: {} });
  });

  it('should create "onMessage" handler in worker when component mounted', () => {
    expect(mockWorker.onmessage).not.toBeDefined();
    shallow(<App imageParsingWorker={mockWorker} />);
    expect(mockWorker.onmessage).toBeDefined();
  });
});
