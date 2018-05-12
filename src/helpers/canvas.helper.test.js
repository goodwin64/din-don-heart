import { getCurrentLetter, getImagePixelsMatrix, mapRgbaToCustomPixels } from './canvas.helper';

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

describe('getImagePixelsMatrix method', () => {
  it('should return empty array if it passed, notwithstanding row width', () => {
    const emptyArray = [];

    expect(getImagePixelsMatrix(emptyArray, 1)).toBe(emptyArray);
    expect(getImagePixelsMatrix(emptyArray, 20)).toBe(emptyArray);
    expect(getImagePixelsMatrix(emptyArray, 100)).toBe(emptyArray);
  });

  it('should make 3 rows by 2 elements from flat 6-size array', () => {
    const actual = getImagePixelsMatrix([1, 2, 3, 4, 5, 6], 2);
    const expected = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];

    expect(actual).toEqual(expected);
  });

  it('should make 2 rows by 3 elements from flat 6-size array', () => {
    const actual = getImagePixelsMatrix([1, 2, 3, 4, 5, 6], 3);
    const expected = [
      [1, 2, 3],
      [4, 5, 6],
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
