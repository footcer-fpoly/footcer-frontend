import React from 'react';
import {Text as RNText, StyleSheet} from 'react-native';
import theme from '../../theme/theme';

// Possible value for prop "type" for Text

export const headline1 = 'headline1';
export const headline2 = 'headline2';
export const headline3 = 'headline3';
export const headline4 = 'headline4';
export const headline5 = 'headline5';
export const headline6 = 'headline6';
export const body1 = 'body1';
export const body2 = 'body2';
export const body3 = 'body3';
export const caption = 'caption';
export const overline = 'overline';

const Text = ({
  /**
   * @type prop helps style Text with pre default styling define in
   * typography.js. Possible value of type can be:
   * 1. 'heading'
   * 2. 'subheading'
   * 3. 'body'
   * 4. 'label'
   * 5. 'caption'
   *
   * default value: 'body'
   */
  type,
  /**
   * @bold prop is a boolean, if enabled will use bold version of the
   * type mentioned.
   */
  bold,
  /**
   * @style prop will overwrite the predefined styling for Text defined by
   * @type prop
   *
   * default value: false
   */
  style,
  ...props
}) => {
  return (
    <RNText
      style={StyleSheet.flatten([styles.text(type, bold), style])}
      {...props}
    />
  );
};

const getTextStyle = (type, bold) => {
  let style = '';
  switch (type) {
    case headline1:
    case headline2:
    case headline3:
    case headline4:
    case headline5:
    case headline6:
    case body1:
    case body2:
    case body3:
    case caption:
    case overline:
      style = type;
      break;
    default:
      style = 'bodyText';
  }
  if (bold) {
    style += 'Bold';
  }
  return theme.typography[style];
};

const styles = {
  text: (type, bold) => ({
    ...getTextStyle(type, bold, theme),
  }),
};

export {Text};
