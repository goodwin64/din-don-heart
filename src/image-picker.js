import workerScript from './worker';

const myWorker = new Worker(workerScript);

export default function initImagePicker(outCanvas, filepicker) {
  /* eslint-disable no-param-reassign */
  myWorker.onmessage = (e) => {
    const response = e.data;
    outCanvas.width = response.width;
    outCanvas.height = response.height;
    const ctx = outCanvas.getContext('2d');
    ctx.drawImage(response, 0, 0);
  };
  /* eslint-enable no-param-reassign */

  filepicker.addEventListener('change', () => {
    myWorker.postMessage({ file: filepicker.files[0] });
  });
}
