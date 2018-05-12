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

Array.range = function (n) {
  // Array.range(5) --> [0,1,2,3,4]
  return new Array(...Array(n)).map((x, i) => i);
};

Array.prototype.chunk = Array.prototype.chunk || function (n) {
  return Array.range(Math.ceil(this.length / n)).map((x, i) => this.slice(i * n, (i * n) + n));
};

export const mapRgbaToCustomPixels = rgbaPixels => [].slice.call(rgbaPixels)
  .chunk(4)
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
    ? flatArr.chunk(rowWidth)
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
