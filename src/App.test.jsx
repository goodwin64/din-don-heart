import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

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
