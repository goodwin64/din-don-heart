import chunk from 'lodash.chunk';
import mean from 'lodash.mean';

// import getDisease from './disease.helper';
import { ERROR_IMAGE_SIZE, onImageError } from './error-handlers.helper';
import { getImageData, mapRgbaToCustomPixels } from './canvas.helper';
import { MAX_IMAGE_HEIGHT, MAX_IMAGE_WIDTH } from '../constants';

/**
 * Reverse because server expects A to Z (bottom to top)
 * But the image is parsed from top to bottom
 */
const abc = 'ABCDEFGHIKLMNOPQRSTVXYZ'.split('').reverse();

export const WHITE_PIXEL = { r: 255, g: 255, b: 255 };
export const GREY_PIXEL = { r: 128, g: 128, b: 128 };
export const DARK_GREY_PIXEL = { r: 64, g: 64, b: 64 };
export const BLACK_PIXEL = { r: 0, g: 0, b: 0 };
export const RED_PIXEL = { r: 255, g: 0, b: 0 };
export const GREEN_PIXEL = { r: 0, g: 255, b: 0 };
export const BLUE_PIXEL = { r: 0, g: 0, b: 255 };

export default function initImageParsingWorker() {
  const imageParsingWorker = new Worker('image-worker.js');

  imageParsingWorker.setOnMessageHandler = (onMessageHandler) => {
    imageParsingWorker.onmessage = onMessageHandler;
  };

  return imageParsingWorker;
}

/**
 * Groups flat Pixels array by Y coordinate (letters)
 */
export const getPixelsByLetters = (flatArr = [], rowWidth) => (
  flatArr.length
    ? chunk(flatArr, rowWidth)
    : flatArr
);
/**
 * Groups flat Pixels array by X coordinate (time)
 */
export const getPixelsByTime = (flatArr = [], columnsCount) =>
  flatArr.reduce((acc, curr, index) => {
    if (index < columnsCount) {
      // container not yet exists
      return [
        ...acc,
        [curr],
      ];
    }
    const currentColumn = index % columnsCount;
    const container = acc[currentColumn];
    container.push(curr);
    return acc;
  }, []);

export const getCurrentLetter = (imageData, alphabet, yCoord) => {
  const alphabetSize = alphabet.length;
  const cardioStepSize = imageData.height / alphabetSize;
  const currentStep = Math.floor(yCoord / cardioStepSize);

  if (currentStep < 0) {
    return alphabet[0];
  } else if (currentStep >= alphabetSize) {
    return alphabet[alphabetSize - 1];
  }

  return alphabet[currentStep];
};
export const findTheMostDarkPixel = (column = []) => column.reduce(
  (theMostBlackPixel, currPixel, currIndex) => {
    const currColor = currPixel.r + currPixel.g + currPixel.b;
    if (currColor < theMostBlackPixel.color) {
      return {
        color: currColor,
        index: currIndex,
      };
    }
    return theMostBlackPixel;
  },
  {
    color: 255 * 3,
    index: 0,
  },
);
const MAX_COLOR_VALUE = 256;
export const arePixelsSimilarByColor = (pixel1, pixel2, maxDeviationInPercent = 5) => {
  if (typeof pixel1 !== 'object' || typeof pixel2 !== 'object') {
    return false;
  }

  const { r: r1, g: g1, b: b1 } = pixel1;
  const { r: r2, g: g2, b: b2 } = pixel2;

  const rSimilarity = Math.abs(r1 - r2) / MAX_COLOR_VALUE;
  const gSimilarity = Math.abs(g1 - g2) / MAX_COLOR_VALUE;
  const bSimilarity = Math.abs(b1 - b2) / MAX_COLOR_VALUE;

  const averageColorSimilarity = (rSimilarity + gSimilarity + bSimilarity) / 3;
  const actualSimilarityPercent = averageColorSimilarity * 100;
  return actualSimilarityPercent <= maxDeviationInPercent;
};

/**
 * Calculates average cell size in pixels
 */
export const getCellsSizeInRow = (
  row = [],
  minWhiteSliceLength = 6,
  cellBackgroundColor = WHITE_PIXEL,
  wallColor = BLACK_PIXEL,
) => {
  const cellsCount = row.filter((pixel, index) => {
    const isNotInTheEnd = index < row.length - minWhiteSliceLength;
    const isFirstWhite = arePixelsSimilarByColor(row[index - 1], wallColor, 90)
      && arePixelsSimilarByColor(pixel, cellBackgroundColor, 10);
    const areNextNeigboursWhite = row
      .slice(index + 1, index + minWhiteSliceLength)
      .every(neighbourPixel => arePixelsSimilarByColor(neighbourPixel, cellBackgroundColor));

    return isFirstWhite && isNotInTheEnd && areNextNeigboursWhite;
  }).length;

  if (cellsCount === 0) {
    return 0;
  }

  return Math.round(row.length / cellsCount);
};

export function calculateCellsSizeInECG(pixelsByRows) {
  const cellsSizesByRows = pixelsByRows.map(row => getCellsSizeInRow(row));
  const averageCellSize = mean(cellsSizesByRows);
  const withoutFloorAndCeilRows = cellsSizesByRows.filter(cellSizeInRow =>
    cellSizeInRow > (averageCellSize * 0.5) &&
    cellSizeInRow < (averageCellSize * 1.5));
  return Math.round(mean(withoutFloorAndCeilRows));
}

function calculateEcgLetters(pixelsByColumns, imageData, shrinkFactor = 1) {
  return chunk(pixelsByColumns, shrinkFactor).map((columnsChunk) => {
    const pixelIndicesInChunk = columnsChunk.reduce((plotPointsInChunk, currentColumn) => {
      const theMostDarkPixel = findTheMostDarkPixel(currentColumn);
      return plotPointsInChunk.concat(theMostDarkPixel.index);
    }, []);
    const averageIndexInChunk = Math.round(mean(pixelIndicesInChunk));
    const letter = getCurrentLetter(imageData, abc, averageIndexInChunk);
    return {
      letter,
      index: averageIndexInChunk,
    };
  });
}

function calculateBaseLineEcg(pixelsList) {
  return Math.round(pixelsList.reduce((acc, curr) => acc + curr.index, 0) / pixelsList.length);
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
  const pixelsByColumns = getPixelsByTime(imagePixels, imageData.width);

  const cellsSize = calculateCellsSizeInECG(pixelsByRows);
  const plotPoints = calculateEcgLetters(pixelsByColumns, imageData, cellsSize);
  const plotPointsDetailed = calculateEcgLetters(pixelsByColumns, imageData, 1);
  const ecgLetters = plotPoints.map(plotPoint => plotPoint.letter);
  const ecgLettersDetailed = plotPointsDetailed.map(plotPoint => plotPoint.letter);
  const baseLineY = calculateBaseLineEcg(plotPoints);

  return {
    baseLineY,
    cellsSize,
    ecgLetters,
    ecgLettersDetailed,
    plotPoints,
  };
};
