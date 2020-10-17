import {StyleSheet} from 'react-native';
import {scale} from '../helpers/size.helper';
import colors from './colors';

const fontFamily = undefined;
const fontWeightRegular = 'normal';
const fontWeightBold = 'bold';
const textGrayColor = colors.grayBlack;

export default StyleSheet.create({
  /**
   * Title is reserved for the title of a screen(Toolbar)
   * and the titles of Modal dialogs.
   */
  headline1: {
    fontFamily,
    fontSize: scale(28),
    fontWeight: fontWeightBold,
    color: textGrayColor,
  },
  headline2: {
    fontFamily,
    fontSize: scale(22),
    fontWeight: fontWeightBold,
    color: textGrayColor,
  },
  headline3: {
    fontFamily,
    fontSize: scale(18),
    fontWeight: fontWeightBold,
    color: textGrayColor,
  },
  headline4: {
    fontFamily,
    fontSize: scale(16),
    fontWeight: fontWeightBold,
    color: textGrayColor,
  },
  headline5: {
    fontFamily,
    fontSize: scale(14),
    fontWeight: fontWeightBold,
    color: textGrayColor,
  },
  headline6: {
    fontFamily,
    fontSize: scale(12),
    fontWeight: fontWeightBold,
    color: textGrayColor,
  },
  body1: {
    fontFamily,
    fontSize: scale(16),
    fontWeight: fontWeightRegular,
    color: textGrayColor,
  },
  body2: {
    fontFamily,
    fontSize: scale(14),
    fontWeight: fontWeightRegular,
    color: textGrayColor,
  },
  body3: {
    fontFamily,
    fontSize: scale(12),
    fontWeight: fontWeightRegular,
    color: textGrayColor,
  },
  caption: {
    fontFamily,
    fontSize: scale(14),
    fontWeight: fontWeightRegular,
    color: textGrayColor,
  },
  overline: {
    fontFamily,
    fontSize: scale(10),
    fontWeight: fontWeightRegular,
    color: textGrayColor,
  },
});
