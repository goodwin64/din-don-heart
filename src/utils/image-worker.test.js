import { workercode } from './image-worker';

describe('@image-worker', () => {
  it('operates with Worker`s "self" from scope', () => {
    global.self = {
      onmessage: () => {},
      postMessage: jest.fn(),
    };
    global.createImageBitmap = () => new Promise(
      response => global.self.postMessage(response),
      () => console.error('Catch statement'),
    );

    expect(global.self.postMessage).not.toHaveBeenCalled();
    workercode();
    global.self.onmessage({ data: { file: '1234.js' } });
    expect(global.self.postMessage).toHaveBeenCalled();
  });
});
