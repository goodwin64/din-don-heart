import MockWorker from './MockWorker';

it('should do nothing on postMessage', () => {
  const spy = jest.fn();
  const mockWorker = new MockWorker('url', spy);

  expect(spy).not.toBeCalled();
  mockWorker.postMessage();
  expect(spy).toBeCalled();
});

it('should set worker URL while creating', () => {
  const url = 'path/to/worker';
  const mockWorker = new MockWorker(url);

  expect(mockWorker.url).toEqual(url);
});
