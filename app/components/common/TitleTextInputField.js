import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import IconMaterialOrSvg from './IconMaterialOrSvg';
import {body2, body3, Text} from './Text';
import * as Animatable from 'react-native-animatable';

const TitleTextInputField = ({
  nameSvgLeft,
  typeLeft,
  iconNameLeft,
  typeRigth,
  iconNameRigth,
  nameSvgRigth,
  sizeIcon,
  onPress,
  lable,
  styleInput,
  otherTextInputProps,
  value,
  style,
  customelement,
  onChangeText,
  textErrorStyle,
  textError,
}) => {
  return (
    <View style={style}>
      <Text type={body2} style={styles.lable}>
        {lable}
      </Text>
      <View style={styles.content(textError && colors.red)}>
        {!customelement ? (
          <View style={styles.warpperInput}>
            {typeLeft && (
              <IconMaterialOrSvg
                type={typeLeft}
                name={iconNameLeft}
                size={sizeIcon}
                nameSvg={nameSvgLeft}
                style={styles.icon}
              />
            )}
            {!typeRigth ? (
              <TextInput
                style={[styles.textInput, styleInput]}
                value={value}
                editable={!onPress}
                onChangeText={onChangeText}
                {...otherTextInputProps}
              />
            ) : (
              <TouchableOpacity
                onPress={onPress}
                style={[styles.textInput, styleInput]}>
                <Text type={body2}>{value}</Text>
              </TouchableOpacity>
            )}
            {typeRigth && (
              <TouchableOpacity onPress={onPress}>
                <IconMaterialOrSvg
                  type={typeRigth}
                  name={iconNameRigth}
                  size={sizeIcon}
                  nameSvg={nameSvgRigth}
                  style={styles.icon}
                />
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View>{customelement}</View>
        )}
      </View>
      {!!textError && (
        <Animatable.Text
          animation="fadeInLeft"
          type={body3}
          style={[styles.textError, textErrorStyle]}>
          {textError}
        </Animatable.Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  content: (color = colors.grayOpacity) => ({
    ...Styles.borderView(color, 1, 0),
    borderRadius: 5,
  }),
  warpperInput: {
    ...Styles.rowAlignCenter,
    paddingVertical: scale(10),
    paddingHorizontal: scale(5),
  },
  textInput: {
    flex: 1,
    marginHorizontal: scale(10),
    padding: 0,
    fontSize: scale(14),
    color: colors.black,
  },
  icon: {
    color: colors.placeHolder,
  },
  lable: {
    color: colors.gray,
    marginBottom: spacing.tiny,
  },
  textError: {
    paddingLeft: scale(15),
    color: colors.red,
  },
});
export default TitleTextInputField;
