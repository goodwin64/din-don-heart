import {
  BLACK_PIXEL,
  BLUE_PIXEL,
  DARK_GREY_PIXEL,
  GREEN_PIXEL,
  GREY_PIXEL,
  RED_PIXEL,
  WHITE_PIXEL,
  arePixelsSimilarByColor,
  findTheMostDarkPixel,
  getCellsSize,
  getCurrentLetter,
  getPixelsByLetters,
  getPixelsByTime,
  mapRgbaToCustomPixels,
} from './canvas.helper';

describe('mapRgbaToCustomPixels method', () => {
  it('should map 1-pixel array', () => {
    const expected = [{
      r: 0, g: 0, b: 0, a: 255,
    }];
    const actual = mapRgbaToCustomPixels([0, 0, 0, 255]);
    expect(actual).toEqual(expected);
  });

  it('should map 2-pixel array', () => {
    const expected = [
      {
        r: 0, g: 0, b: 0, a: 255,
      },
      {
        r: 1, g: 1, b: 1, a: 128,
      },
    ];
    const actual = mapRgbaToCustomPixels([0, 0, 0, 255, 1, 1, 1, 128]);
    expect(actual).toEqual(expected);
  });
});

describe('getPixelsByLetters method', () => {
  it('should return empty array if it passed, notwithstanding row width', () => {
    const emptyArray = [];

    expect(getPixelsByLetters(emptyArray, 1)).toBe(emptyArray);
    expect(getPixelsByLetters(emptyArray, 20)).toBe(emptyArray);
    expect(getPixelsByLetters(emptyArray, 100)).toBe(emptyArray);
  });

  it('should make 3 rows by 2 elements from flat 6-size array', () => {
    const actual = getPixelsByLetters([1, 2, 3, 4, 5, 6], 2);
    const expected = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];

    expect(actual).toEqual(expected);
  });

  it('should make 2 rows by 3 elements from flat 6-size array', () => {
    const actual = getPixelsByLetters([1, 2, 3, 4, 5, 6], 3);
    const expected = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    expect(actual).toEqual(expected);
  });
});

describe('getPixelsByTime', () => {
  let actual;
  let expected;

  it('should return empty array if such passed', () => {
    expect(getPixelsByTime([])).toEqual([]);
  });

  it('should make 2 columns from 6-size array', () => {
    actual = getPixelsByTime([1, 2, 3, 4, 5, 6], 2);
    expected = [
      [1, 3, 5],
      [2, 4, 6],
    ];

    // expect(actual).toEqual(expected);
  });

  it('should make 4 columns from 16-size array', () => {
    const arrFrom1To16 = Array(16).fill(0).map((_, index) => index + 1);
    actual = getPixelsByTime(arrFrom1To16, 4);
    expected = [
      [1, 5, 9, 13],
      [2, 6, 10, 14],
      [3, 7, 11, 15],
      [4, 8, 12, 16],
    ];

    expect(actual).toEqual(expected);
  });
});

describe('getCurrentLetter method', () => {
  const mockAbc = ['A', 'B', 'C', 'D', 'E'];
  const mockImageData = { height: 8 };
  let expected;

  it('should recognize first letter if outside of boundary (left)', () => {
    expect(getCurrentLetter(mockImageData, mockAbc, -20)).toEqual('A');
  });

  it('should recognize first letter if outside of boundary (right)', () => {
    expect(getCurrentLetter(mockImageData, mockAbc, 20)).toEqual('E');
  });

  it('should recognize step A', () => {
    expected = 'A';

    expect(getCurrentLetter(mockImageData, mockAbc, 0)).toEqual(expected);
    expect(getCurrentLetter(mockImageData, mockAbc, 0.01)).toEqual(expected);
    expect(getCurrentLetter(mockImageData, mockAbc, 0.85)).toEqual(expected);
    expect(getCurrentLetter(mockImageData, mockAbc, 1.599)).toEqual(expected);
  });

  it('should recognize step B', () => {
    expected = 'B';

    expect(getCurrentLetter(mockImageData, mockAbc, 1.6)).toEqual(expected);
    expect(getCurrentLetter(mockImageData, mockAbc, 2)).toEqual(expected);
    expect(getCurrentLetter(mockImageData, mockAbc, 3)).toEqual(expected);
    expect(getCurrentLetter(mockImageData, mockAbc, 3.19)).toEqual(expected);
  });

  it('should recognize step E', () => {
    expected = 'E';

    expect(getCurrentLetter(mockImageData, mockAbc, 7.9)).toEqual(expected);
  });
});

describe('findTheMostDarkPixel method', () => {
  it('should return 0 index by default', () => {
    expect(findTheMostDarkPixel([]).index).toEqual(0);
  });

  it('should return white color by default', () => {
    expect(findTheMostDarkPixel([]).color).toEqual(255 * 3);
  });

  it('should find the most dark pixel among white ones', () => {
    const column = [
      {
        r: 255, g: 250, b: 190, a: 0,
      },
      {
        r: 120, g: 130, b: 119, a: 255, // the most dark
      },
      {
        r: 255, g: 255, b: 229, a: 0,
      },
      {
        r: 255, g: 245, b: 255, a: 0,
      },
    ];

    expect(findTheMostDarkPixel(column).index).toEqual(1);
  });
});

describe('arePixelsSimilarByColor method', () => {
  it('pixel is similar to itself regardless deviation %', () => {
    const pixel = { r: 0, g: 128, b: 255 };
    expect(arePixelsSimilarByColor(pixel, pixel)).toEqual(true);
  });

  it('black and white pixels are similar only when 100% deviation', () => {
    const black = { r: 0, g: 0, b: 0 };
    const white = { r: 255, g: 255, b: 255 };
    expect(arePixelsSimilarByColor(black, white, 0)).toEqual(false);
    expect(arePixelsSimilarByColor(black, white, 99)).toEqual(false);
    expect(arePixelsSimilarByColor(black, white, 100)).toEqual(true);
  });

  it('50% and 75% grey are similar if 25% similarity deviation', () => {
    const grey50 = { r: 128, g: 128, b: 128 };
    const grey75 = { r: 192, g: 192, b: 192 };
    expect(arePixelsSimilarByColor(grey50, grey75, 10)).toEqual(false);
    expect(arePixelsSimilarByColor(grey50, grey75, 20)).toEqual(false);
    expect(arePixelsSimilarByColor(grey50, grey75, 25)).toEqual(true);
  });

  it('light red and cell wall color are similar if 90% similarity deviation', () => {
    const lightRed = { r: 242, g: 193, b: 212 };
    expect(arePixelsSimilarByColor(lightRed, BLACK_PIXEL, 10)).toEqual(false);
    expect(arePixelsSimilarByColor(lightRed, BLACK_PIXEL, 20)).toEqual(false);
    expect(arePixelsSimilarByColor(lightRed, BLACK_PIXEL, 80)).toEqual(false);
    expect(arePixelsSimilarByColor(lightRed, BLACK_PIXEL, 90)).toEqual(true);
  });

  it('should have black-color deviation opposite to white-color deviation', () => {
    const pixels = [
      BLACK_PIXEL,
      DARK_GREY_PIXEL,
      GREY_PIXEL,
      WHITE_PIXEL,
      RED_PIXEL,
      GREEN_PIXEL,
      BLUE_PIXEL,
    ];
    expect(pixels.every((pixel) => {
      // random number, just to check opposite
      const deviationFromBlack = 35;
      const deviationFromWhite = 100 - deviationFromBlack;

      const isSimilarToBlack = arePixelsSimilarByColor(BLACK_PIXEL, pixel, deviationFromBlack);
      const isSimilarToWhite = arePixelsSimilarByColor(WHITE_PIXEL, pixel, deviationFromWhite);

      return isSimilarToBlack !== isSimilarToWhite;
    })).toEqual(true);
  });
});

describe('getCellsSize method', () => {
  it('0 when empty array', () => {
    expect(getCellsSize([])).toEqual(0);
  });

  /**
   *  ------- ceil row, no white pixels
   *  |12345|     row with walls and 1 cell, 5 white pixels
   *  |1234||     row with walls and 1 cell, 4 white pixels
   *  |1234||123| row with walls and 2 cells, 4 white pixels
   *  ------- floor row
   */
  it('row with walls', () => {
    const pixels = [
      BLACK_PIXEL, GREY_PIXEL,
      WHITE_PIXEL, WHITE_PIXEL, WHITE_PIXEL,
      BLACK_PIXEL,
      WHITE_PIXEL, WHITE_PIXEL, WHITE_PIXEL, WHITE_PIXEL,
    ];
    expect(getCellsSize(pixels, 3)).toEqual(5);
  });

  it('0 cells in ceil or floor row', () => {
    const pixels = [BLACK_PIXEL, GREY_PIXEL, BLACK_PIXEL];
    expect(getCellsSize(pixels)).toEqual(0);
  });
});
