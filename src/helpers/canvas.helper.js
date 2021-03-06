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
