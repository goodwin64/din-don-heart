// import getDisease from './disease.helper';
import { onImageError } from './error-handlers.helper';
import { getImageData, mapRgbaToCustomPixels } from './canvas.helper';

const myWorker = new Worker('image-worker.js');
const defaultFile = {};

export default function initImagePicker(outCanvas, filepicker) {
  myWorker.onmessage = (e) => {
    const response = e.data;
    if (response.error) {
      onImageError(response);
      return;
    }

    const imageData = getImageData(response);
    const imagePixelsUInt8ClampedArray = [].slice.call(imageData.data);

    const imagePixels = mapRgbaToCustomPixels(imagePixelsUInt8ClampedArray);
    console.log(imagePixels);
  };

  filepicker.addEventListener('change', () => {
    const file = filepicker.files[0] || defaultFile;
    myWorker.postMessage({ file });
  });
}
