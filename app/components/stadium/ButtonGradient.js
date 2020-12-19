import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import colors from '../../theme/colors';
import {headline6, Text} from '../common/Text';

export default function ButtonGradient({
  iconName,
  backgroundColor,
  title,
  onPress,
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={styles.containerBtn(backgroundColor)}>
        <Icon name={iconName} size={30} color={colors.white} />
      </TouchableOpacity>
      <Text type={headline6} style={styles.txtTitle}>
        {title}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {...Styles.columnCenter, flex: 1},
  containerBtn: (bg) => ({
    width: scale(60),
    height: scale(60),
    borderRadius: scale(10),
    ...Styles.columnCenter,
    backgroundColor: bg,
  }),
  txtTitle: {marginTop: scale(10), color: colors.gray},
});
