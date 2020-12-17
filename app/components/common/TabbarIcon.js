import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import colors from '../../theme/colors';

export default function TabbarIcon({iconTab, focused}) {
  const renderIcon = () => {
    if (iconTab.type === 'icon') {
      return (
        <MaterialCommunityIcons
          name={iconTab.name}
          style={styles.iconStyle(focused)}
        />
      );
    }
    return <Image source={{uri: iconTab.url}} style={styles.imageIconStyle} />;
  };
  return <View style={styles.iconWrapper(focused)}>{renderIcon()}</View>;
}

const styles = StyleSheet.create({
  imageIconStyle: {
    ...Styles.borderRadiusCircle(scale(25)),
  },
  iconStyle: (focused) => ({
    fontSize: scale(25),
    color: focused ? colors.green : colors.grayDark + '80',
  }),
  iconWrapper: (focused) => ({
    // backgroundColor: focused ? colors.main : colors.main + '33',
    // borderRadius: 999,
    // padding: 5,
  }),
});
