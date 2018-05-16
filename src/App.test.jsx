import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';

import { App } from './App';

const mockWorker = {
  postMessage: () => {},
};

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
  const componentWrapper = mount(<App imageParsingWorker={mockWorker} />);
  const fileContents = 'file contents';
  const textFile = new Blob([fileContents], { type: 'text/plain' });
  const readAsText = jest.spyOn(mockWorker, 'postMessage');

  componentWrapper.find('input').simulate('change', { target: { files: [textFile] } });
  expect(readAsText).toHaveBeenCalledWith({ file: textFile });
  componentWrapper.find('input').simulate('change', { target: { files: [] } });
  expect(readAsText).toHaveBeenCalledWith({ file: {} });
});
