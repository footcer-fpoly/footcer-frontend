import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {scale} from '../../helpers/size.helper';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import IconMaterialOrSvg from '../common/IconMaterialOrSvg';
import {body3, Text} from '../common/Text';

export default function AccountBlock({
  onPress,
  text,
  nameSvg,
  style,
  type,
  iconName,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <IconMaterialOrSvg
        type={type}
        name={iconName}
        size={scale(25)}
        imageStyle={styles.imageSouceStyle}
        nameSvg={nameSvg}
        style={styles.icon}
      />
      <Text type={body3} style={styles.txt}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: scale(10),
    backgroundColor: colors.white,
    borderRadius: scale(5),
    shadowColor: colors.grayLight,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 2,
    shadowRadius: 2,
    elevation: 1,
  },
  txt: {
    color: colors.black,
    textAlign: 'center',
    marginTop: spacing.tiny,
    fontSize: scale(11),
  },
  icon: {
    color: colors.greenDark,
  },
});
