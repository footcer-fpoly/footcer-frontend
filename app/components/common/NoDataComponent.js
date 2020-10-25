import React from 'react';
import {StyleSheet, View} from 'react-native';
import icNoData from '../../assets/svg/ic_no_data.svg';
import {scale} from '../../helpers/size.helper';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import IconMaterialOrSvg, {IconType} from './IconMaterialOrSvg';
import {body3, Text} from './Text';

export default function NoDataComponent({text, style}) {
  return (
    <View style={[styles.container, style]}>
      <IconMaterialOrSvg
        type={IconType.Svg}
        size={scale(150)}
        SVGIcon={icNoData}
        style={styles.redColor}
      />
      <Text type={body3} style={styles.txt}>
        {text}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  txt: {
    color: colors.gray,
    textAlign: 'center',
    marginTop: spacing.small,
  },
});
