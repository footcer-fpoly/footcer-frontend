import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import IconMaterialOrSvg from '../common/IconMaterialOrSvg';
import {body2, body3, Text} from '../common/Text';
import * as Animatable from 'react-native-animatable';

export default function RowProflie({
  iconType,
  iconName,
  SVGIcon,
  value,
  label,
  editable,
  onPress,
  stylesTxt,
  onChangeText,
  textError,
  textErrorStyle,
}) {
  return (
    <>
      <View style={styles.container(textError && colors.red)}>
        <IconMaterialOrSvg
          type={iconType}
          name={iconName}
          size={scale(20)}
          SVGIcon={SVGIcon}
          style={styles.icon}
        />
        <Text type={body3} style={styles.label}>
          {label}
        </Text>
        {onPress ? (
          <TouchableOpacity
            disabled={!editable}
            onPress={onPress}
            style={styles.btn}>
            <Text
              type={body2}
              style={[
                styles.txtBtn,
                editable ? {color: colors.black} : {color: colors.grayDark},
                stylesTxt,
              ]}>
              {value}
            </Text>
            {!stylesTxt && (
              <Icon
                name="menu-down"
                size={21}
                color={editable ? colors.black : colors.grayDark}
              />
            )}
          </TouchableOpacity>
        ) : (
          <TextInput
            onChangeText={onChangeText}
            editable={editable}
            value={value}
            style={[
              styles.input,
              editable ? {color: colors.black} : {color: colors.grayDark},
              stylesTxt,
            ]}
          />
        )}
      </View>
      {textError && (
        <Animatable.Text
          animation="fadeInLeft"
          type={body3}
          style={[styles.textError, textErrorStyle]}>
          {textError}
        </Animatable.Text>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: (color = colors.placeHolder) => ({
    paddingVertical: spacing.tiny,
    borderBottomWidth: 0.2,
    borderBottomColor: color,
    ...Styles.rowCenter,
    height: scale(40),
  }),
  label: {
    marginLeft: spacing.large,
    marginRight: spacing.small,
    color: colors.gray,
  },
  icon: {
    color: colors.gray,
  },
  input: {
    flex: 1,
    textAlign: 'right',
    fontSize: scale(13),
    color: colors.black,
    padding: 0,
  },
  btn: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  txtBtn: {textAlign: 'right', fontSize: scale(13)},
  textError: {
    paddingLeft: scale(15),
    color: colors.red,
  },
});
