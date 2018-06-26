const defaultImageValue = null;

class ImageHolder {
  constructor() {
    this.currentImage = defaultImageValue;
  }

  setImage(image) {
    this.currentImage = image;
  }

  getImage() {
    return this.currentImage;
  }

  resetImage() {
    this.currentImage = defaultImageValue;
  }
}

const imageHolder = new ImageHolder();

export default imageHolder;
