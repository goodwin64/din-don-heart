import getDisease from './disease-service';

const myWorker = new Worker('image-worker.js');
const defaultFile = {};

export default function initImagePicker(outCanvas, filepicker) {
  myWorker.onmessage = (e) => {
    const response = e.data;
    if (response.error) {
      console.log(response.errorMessage);
      return;
    }

    /* eslint-disable no-param-reassign */
    outCanvas.width = 240;
    outCanvas.height = 180;
    /* eslint-enable no-param-reassign */
    const ctx = outCanvas.getContext('2d');
    ctx.font = '18px Arial';

    if (getDisease(response)) {
      ctx.fillText('You are ill', 10, 50);
    } else {
      ctx.fillText('You are healthy', 10, 50);
    }
  };

  filepicker.addEventListener('change', () => {
    const file = filepicker.files[0] || defaultFile;
    myWorker.postMessage({ file });
  });
}
