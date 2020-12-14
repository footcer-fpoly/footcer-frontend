import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import IconMaterialOrSvg, {IconType} from '../common/IconMaterialOrSvg';
import {body3, headline5, headline6, Text} from '../common/Text';

export default function RowButton({
  iconType,
  iconName,
  nameSvg,
  text,
  onPress,
}) {
  return (
    <View onPress={onPress} style={styles.container}>
      <IconMaterialOrSvg
        type={iconType}
        name={iconName}
        size={scale(25)}
        imageStyle={styles.imageSouceStyle}
        nameSvg={nameSvg}
        style={styles.icon}
      />
      <TouchableOpacity style={styles.warpperBtn} onPress={onPress}>
        <Text type={headline6} style={styles.txt}>
          {text}
        </Text>
        <IconMaterialOrSvg
          type={IconType.MaterialIcons}
          name="navigate-next"
          size={scale(25)}
        />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    ...Styles.rowBetween,
    paddingVertical: scale(10),
  },
  warpperBtn: {
    flex: 1,
    ...Styles.rowBetween,
    marginLeft: scale(10),
  },
  txt: {
    flex: 1,
  },
});
