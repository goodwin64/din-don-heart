// import getDisease from './disease.helper';
import { ERROR_IMAGE_SIZE, onImageError } from './error-handlers.helper';
import {
  findTheMostDarkPixel,
  getCellsSize,
  getCurrentLetter,
  getImageData,
  getPixelsByLetters,
  getPixelsByTime,
  mapRgbaToCustomPixels,
} from './canvas.helper';

const imageParsingWorker = new Worker('image-worker.js');

const MAX_IMAGE_WIDTH = 4000;
const MAX_IMAGE_HEIGHT = 3000;
const alphabet = 'ABCDEFGHIKLMNOPQRSTVXYZ'.split('');

export default function initImagePicker() {
  imageParsingWorker.onmessage = (e) => {
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
    const pixelsByRows = getPixelsByLetters(imagePixels, imageData.width);
    const cellsSize = getCellsSize(pixelsByRows);
    const pixelsByColumns = getPixelsByTime(imagePixels, imageData.width);
    const ecg = pixelsByColumns.map((column) => {
      const theMostDarkPixel = findTheMostDarkPixel(column);
      return {
        pixel: theMostDarkPixel,
        letter: getCurrentLetter(imageData, alphabet, theMostDarkPixel.index),
      };
    });
    const baseLineY = ecg.reduce((acc, curr) => acc + curr.pixel.index, 0) / ecg.length;
    console.log(baseLineY, cellsSize);
  };

  return {
    imageParsingWorker,
  };
}
