import workerScript from './worker';

const myWorker = new Worker(workerScript);

export default function initImagePicker(outCanvas, filepicker) {
  myWorker.onmessage = (e) => {
    const response = e.data;
    /* eslint-disable no-param-reassign */
    outCanvas.width = response.width;
    outCanvas.height = response.height;
    /* eslint-enable no-param-reassign */
    const ctx = outCanvas.getContext('2d');
    ctx.drawImage(response, 0, 0);
  };

  filepicker.addEventListener('change', () => {
    myWorker.postMessage({ file: filepicker.files[0] });
  });
}
