import React from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {moderateScale, scale} from '../../helpers/size.helper';
import colors from '../../theme/colors';
import {overline, Text} from './Text';

const TabbarComponent = ({state, descriptors, navigation}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const renderRoute = () => {
    return state.routes.map((route, index) => {
      const {options} = descriptors[route.key];
      const label =
        options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
          ? options.title
          : route.name;
      const isFocused = state.index === index;

      const onPress = () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name);
        }
      };

      const color = isFocused ? colors.green : colors.grayDark + '80';
      return (
        <TouchableOpacity
          key={route.key.toString()}
          accessibilityRole="button"
          accessibilityStates={isFocused ? ['selected'] : []}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
          activeOpacity={1}
          style={styles.buttonTabbar}>
          {options.tabBarIcon({
            focused: isFocused,
            color: color,
            size: moderateScale(25),
          })}
          <Text
            type={overline}
            numberOfLines={1}
            style={[styles.labelStyle, {color: color}]}>
            {label}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.tabContainer}>{renderRoute()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonTabbar: {flex: 1, alignItems: 'center'},
  wrapper: {
    backgroundColor: colors.grayLight,
  },
  tabContainer: {
    flexDirection: 'row',
    height: moderateScale(55),
    paddingTop: moderateScale(5),
    paddingBottom: moderateScale(5),
  },
  labelStyle: {
    marginTop: moderateScale(3),
    fontWeight: 'bold',
    fontSize: scale(11),
  },
});
export default TabbarComponent;
