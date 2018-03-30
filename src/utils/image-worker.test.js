import { imageWorkerCode } from './image-worker';

const noop = () => {};

describe('@image-worker', () => {
  Object.defineProperties(global.self, {
    onmessage: { value: noop },
    postMessage: { value: noop },
  });
  Object.defineProperty(global, 'createImageBitmap', {
    value: filepath => Promise
      .resolve(filepath)
      .then(response => global.self.postMessage(response)),
  });

  it('operates with Worker`s "self" from scope', () => {
    const spyPostMsg = jest.spyOn(global.self, 'postMessage');

    expect(spyPostMsg).not.toHaveBeenCalled();
    expect(global.self.onmessage).toBe(noop);

    imageWorkerCode();
    global.self.onmessage({ data: { file: '1234.js' } });

    // no access to inner scope and Promise "then" invocation, but need test async-ly
    setTimeout(() => {
      expect(spyPostMsg).toHaveBeenCalledWith('1234.js');
    }, 0);
  });
});
