import mean from 'lodash.mean';

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

const MAX_IMAGE_WIDTH = 4000;
const MAX_IMAGE_HEIGHT = 3000;
const alphabet = 'ABCDEFGHIKLMNOPQRSTVXYZ'.split('');

export default function initImageParsingWorker() {
  const imageParsingWorker = new Worker('image-worker.js');

  imageParsingWorker.setOnMessageHandler = (onMessageHandler) => {
    imageParsingWorker.onmessage = onMessageHandler;
  };

  return imageParsingWorker;
}

export const getEcgResult = (workerResponse) => {
  if (workerResponse.error) {
    onImageError(workerResponse);
    return '';
  }

  const imageData = getImageData(workerResponse);
  if (imageData.height > MAX_IMAGE_HEIGHT || imageData.width > MAX_IMAGE_WIDTH) {
    onImageError({
      errorMessage: ERROR_IMAGE_SIZE,
    });
    return '';
  }

  const imagePixels = mapRgbaToCustomPixels(imageData.data);
  const pixelsByRows = getPixelsByLetters(imagePixels, imageData.width);
  const cellsSize = (() => {
    const cellsSizesByRows = pixelsByRows.map(row => getCellsSize(row));
    const averageCellSize = mean(cellsSizesByRows);
    const withoutFloorAndCeilRows = cellsSizesByRows.filter(cellSizeInRow =>
      cellSizeInRow > (averageCellSize * 0.5) &&
      cellSizeInRow < (averageCellSize * 1.5));
    return Math.round(mean(withoutFloorAndCeilRows));
  })();
  const pixelsByColumns = getPixelsByTime(imagePixels, imageData.width);
  const ecg = pixelsByColumns.map((column) => {
    const theMostDarkPixel = findTheMostDarkPixel(column);
    return {
      pixel: theMostDarkPixel,
      letter: getCurrentLetter(imageData, alphabet, theMostDarkPixel.index),
    };
  });
  const baseLineY = ecg.reduce((acc, curr) => acc + curr.pixel.index, 0) / ecg.length;
  return `ECG baseline: ${baseLineY}, cells size in px: ${cellsSize}`;
};
