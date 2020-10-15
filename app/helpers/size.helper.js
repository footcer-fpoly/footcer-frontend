import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

//Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const scale = size => (shortDimension / guidelineBaseWidth) * size;
export const verticalScale = size =>
  (longDimension / guidelineBaseHeight) * size;
export const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

/*
  example:
  fontSize at iphone 7 = 14, UIKit Size (Points): 375 x 667
  fontSize: moderateScale(14) = 14 pixel
  example: fontSize at iphone 8 Plus = 14, UIKit Size (Points): 414 x 736
  fontSize: moderateScale(14) = 15 pixel
*/
