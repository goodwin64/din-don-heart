export const ERROR_IMAGE_CREATING = 'Error while image creating';
export const ERROR_IMAGE_PROCESSING = 'Error while image processing';
export const ERROR_IMAGE_SIZE = 'Image has incorrect size. Probably, too big.';

export const onImageError = (error) => {
  console.log(error.errorMessage);
};
