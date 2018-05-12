// import getDisease from './disease.helper';
import { ERROR_IMAGE_SIZE, onImageError } from './error-handlers.helper';
import {
  findTheMostDarkPixel, getCurrentLetter, getImageData, getPixelsByTime,
  mapRgbaToCustomPixels,
} from './canvas.helper';

const myWorker = new Worker('image-worker.js');
const defaultFile = {};

const MAX_IMAGE_WIDTH = 4000;
const MAX_IMAGE_HEIGHT = 3000;
const alphabet = 'ABCDEFGHIKLMNOPQRSTVXYZ'.split('');

export default function initImagePicker(outCanvas, filepicker) {
  myWorker.onmessage = (e) => {
    const response = e.data;
    if (response.error) {
      onImageError(response);
      return;
    }

    const imageData = getImageData(response);
    if (imageData.height > MAX_IMAGE_HEIGHT || imageData.width > MAX_IMAGE_WIDTH) {
      onImageError({
        errorMessage: ERROR_IMAGE_SIZE,
      });
      return;
    }

    const imagePixels = mapRgbaToCustomPixels(imageData.data);
    const imagePixelsMatrix = getPixelsByTime(imagePixels, imageData.width);
    const letters = imagePixelsMatrix.map((column) => {
      const theMostDarkPixelIndex = findTheMostDarkPixel(column).index;
      return getCurrentLetter(imageData, alphabet, theMostDarkPixelIndex);
    });
    console.log(letters);
  };

  filepicker.addEventListener('change', () => {
    const file = filepicker.files[0] || defaultFile;
    myWorker.postMessage({ file });
  });
}
