import chunk from 'lodash.chunk';

export const WHITE_PIXEL = { r: 255, g: 255, b: 255 };
export const GREY_PIXEL = { r: 128, g: 128, b: 128 };
export const DARK_GREY_PIXEL = { r: 64, g: 64, b: 64 };
export const BLACK_PIXEL = { r: 0, g: 0, b: 0 };
export const RED_PIXEL = { r: 255, g: 0, b: 0 };
export const GREEN_PIXEL = { r: 0, g: 255, b: 0 };
export const BLUE_PIXEL = { r: 0, g: 0, b: 255 };

export const getCanvas = function (w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
};

export const getImageData = function (img) {
  const c = getCanvas(img.width, img.height);
  const ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0);
  return ctx.getImageData(0, 0, c.width, c.height);
};

export const mapRgbaToCustomPixels = rgbaPixels => chunk(
  [].slice.call(rgbaPixels),
  4,
)
  .map(arr => ({
    r: arr[0],
    g: arr[1],
    b: arr[2],
    a: arr[3],
  }));

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
export const getCellsSize = (
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
