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

export const getImagePixelsMatrix = (flatArr = [], rowWidth) => (
  flatArr.length
    ? flatArr.chunk(rowWidth)
    : flatArr
);
