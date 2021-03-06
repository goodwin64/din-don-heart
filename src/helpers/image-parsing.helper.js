/* eslint-disable quotes,comma-spacing,key-spacing,quote-props,object-curly-newline,object-curly-spacing,max-len */
import chunk from 'lodash.chunk';
import mean from 'lodash.mean';

import {
  ERROR_IMAGE_SIZE,
  onImageError,
} from './error-handlers.helper';
import { mapRgbaToCustomPixels } from './canvas.helper';

import {
  abc,
  BLACK_PIXEL,
  MAX_IMAGE_HEIGHT,
  MAX_IMAGE_WIDTH,
  WHITE_PIXEL,
} from '../constants/constants';

export const getRgbSum = pixel => pixel.r + pixel.g + pixel.b;

/**
 * Groups flat Pixels array by Y coordinate (letters)
 */
export const getPixelsByRows = (flatArr = [], rowWidth = 1) => (
  flatArr.length
    ? chunk(flatArr, rowWidth)
    : flatArr
);
/**
 * Groups flat Pixels array by X coordinate (time)
 */
export const getPixelsByColumns = (flatArr = [], columnsCount = 1) =>
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

export const getCurrentLetter = (yAmplitude, yCoord, alphabet) => {
  const alphabetSize = alphabet.length;
  // couldn't be zero
  const cardioStepSize = (yAmplitude / alphabetSize) || 1;
  const currentStep = Math.floor(yCoord / cardioStepSize);

  if (currentStep < 0) {
    return alphabet[0];
  } else if (currentStep >= alphabetSize) {
    return alphabet[alphabetSize - 1];
  }

  return alphabet[currentStep];
};

export const findTheMostDarkPixel = (column = []) => column.reduce(
  (accumulator, currPixel, currIndex) => {
    const currColor = getRgbSum(currPixel);
    if (currColor === accumulator.rgbSum) {
      const theMostDarkPixelsIndices = accumulator.theMostDarkPixelsIndices.concat(currIndex);
      return {
        rgbSum: currColor,
        index: Math.round(mean(theMostDarkPixelsIndices)),
        theMostDarkPixelsIndices,
      };
    } else if (currColor < accumulator.rgbSum) {
      return {
        rgbSum: currColor,
        index: currIndex,
        theMostDarkPixelsIndices: [currIndex],
      };
    }
    return accumulator;
  },
  {
    rgbSum: 255 * 3,
    index: 0,
    theMostDarkPixelsIndices: [],
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
  minWhiteSliceLength = 2,
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

export function calculateCellSizeInECG(pixelsByRows) {
  const cellsSizesByRows = pixelsByRows
    .map(row => getCellsSizeInRow(row))
    .filter(cellsSize => cellsSize > 0);
  const averageCellSize = mean(cellsSizesByRows);
  const withoutFloorAndCeilRows = cellsSizesByRows.filter(cellSizeInRow =>
    cellSizeInRow > (averageCellSize * 0.5) &&
    cellSizeInRow < (averageCellSize * 1.5));
  return Math.round(mean(withoutFloorAndCeilRows));
}

function calculateEcgPlotIndices(pixelsByColumns, shrinkFactor = 1) {
  return chunk(pixelsByColumns, shrinkFactor).map((columnsChunk) => {
    const pixelIndicesInChunk = columnsChunk.reduce((plotIndicesInChunk, currentColumn) => {
      const theMostDarkPixel = findTheMostDarkPixel(currentColumn);
      return plotIndicesInChunk.concat(theMostDarkPixel.index);
    }, []);
    return Math.round(mean(pixelIndicesInChunk));
  });
}

function calculateBaseLineEcg(pixelsList) {
  return Math.round(pixelsList.reduce((acc, curr) => acc + curr, 0) / pixelsList.length);
}

/**
 * All points indices become reduced by min index
 * So now algorithm looks for letters not in the entire image height amplitude
 * but from min index to max index. It means the outer space is ignored.
 */
export function calculateEcgLetters(indices, alphabet, shrinkFactor = 1) {
  const [maxIndex, minIndex] = [Math.max.apply(null, indices), Math.min.apply(null, indices)];
  const yAmplitude = maxIndex - minIndex;

  return chunk(indices, shrinkFactor).map((chunkOfIndices) => {
    const currChunkAverageIndex = Math.round(mean(chunkOfIndices));
    const letterIndex = (
      yAmplitude === 0
        ? currChunkAverageIndex
        : currChunkAverageIndex - minIndex
    );
    return getCurrentLetter(yAmplitude, letterIndex, alphabet);
  }).join('');
}

export const getEcgResult = (imageData) => {
  if (imageData.height > MAX_IMAGE_HEIGHT || imageData.width > MAX_IMAGE_WIDTH) {
    onImageError({
      errorMessage: ERROR_IMAGE_SIZE,
    });
    return {};
  }

  const imagePixels = mapRgbaToCustomPixels(imageData.data);
  const pixelsByRows = getPixelsByRows(imagePixels, imageData.width);
  const pixelsByColumns = getPixelsByColumns(imagePixels, imageData.width);

  const cellsSize = calculateCellSizeInECG(pixelsByRows);
  const plotIndices = calculateEcgPlotIndices(pixelsByColumns, cellsSize);
  const plotIndicesAll = calculateEcgPlotIndices(pixelsByColumns, 1);

  const ecgLetters = calculateEcgLetters(plotIndicesAll, abc, cellsSize);
  const ecgLettersDetailed = calculateEcgLetters(plotIndicesAll, abc);
  const baseLineY = calculateBaseLineEcg(plotIndices);

  return {
    baseLineY,
    cellsSize,
    ecgLetters,
    ecgLettersDetailed,
    plotIndices,
  };
};
