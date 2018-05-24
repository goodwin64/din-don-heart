import * as noopModule from '../helpers/noop';

import MockWorker from './mockWorker';

it('should do nothing on postMessage', () => {
  const spy = jest.spyOn(noopModule, 'noop');
  const mockWorker = new MockWorker();

  expect(spy).not.toBeCalled();
  mockWorker.postMessage();
  expect(spy).toBeCalled();
});

it('should set worker URL while creating', () => {
  const url = 'path/to/worker';
  const mockWorker = new MockWorker(url);

  expect(mockWorker.url).toEqual(url);
});
