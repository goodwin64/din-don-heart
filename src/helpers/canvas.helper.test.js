import { mapRgbaToCustomPixels } from './canvas.helper';

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
