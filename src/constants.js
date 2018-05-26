export const CLOSE_CHARACTER = '×';

export const MAX_IMAGE_WIDTH = 4000;
export const MAX_IMAGE_HEIGHT = 3000;

/**
 * Reverse because server expects A to Z (bottom to top)
 * But the image is parsed from top to bottom
 */
export const abc = 'ABCDEFGHIKLMNOPQRSTVXYZ';
export const abcReversed = abc.split('').reverse();

export const WHITE_PIXEL = { r: 255, g: 255, b: 255 };
export const GREY_PIXEL = { r: 128, g: 128, b: 128 };
export const DARK_GREY_PIXEL = { r: 64, g: 64, b: 64 };
export const BLACK_PIXEL = { r: 0, g: 0, b: 0 };
export const RED_PIXEL = { r: 255, g: 0, b: 0 };
export const GREEN_PIXEL = { r: 0, g: 255, b: 0 };
export const BLUE_PIXEL = { r: 0, g: 0, b: 255 };

export const DISEASE_MESSAGE_DEATH = 'Seems that it is an ECG of dead person';
export const MIN_ECG_LENGTH = 100;
export const DISEASE_MESSAGE_TOO_SHORT = 'Too short ECG slice';
export const DISEASE_MESSAGE_HEALTHY = 'You\'re healthy!';
