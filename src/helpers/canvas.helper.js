import chunk from 'lodash.chunk';

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
  const { r: r1, g: g1, b: b1 } = pixel1;
  const { r: r2, g: g2, b: b2 } = pixel2;

  const rSimilarity = Math.abs(r1 - r2) / MAX_COLOR_VALUE;
  const gSimilarity = Math.abs(g1 - g2) / MAX_COLOR_VALUE;
  const bSimilarity = Math.abs(b1 - b2) / MAX_COLOR_VALUE;

  const averageColorSimilarity = (rSimilarity + gSimilarity + bSimilarity) / 3;
  const actualSimilarityPercent = averageColorSimilarity * 100;
  return actualSimilarityPercent <= maxDeviationInPercent;
};

export const getCellsInfo = (flatArr = []) => {

};
