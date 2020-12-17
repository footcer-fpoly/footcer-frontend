import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Octicons';
import {scale} from '../../helpers/size.helper';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import dimens from '../../theme/dimens';
import Styles from '../../helpers/styles.helper';

const BackIcon = ({onPress, color, style}) => {
  const navigation = useNavigation();

  const handleOnPress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={handleOnPress}>
      <Icon
        name="chevron-left"
        size={scale(25)}
        color={color ?? colors.white}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: dimens.STATUS_BAR_HEIGHT,
    left: 10,
    zIndex: 9,
    backgroundColor: colors.placeHolder,
    ...Styles.columnCenter,
    ...Styles.borderRadiusCircle(30),
  },
});

export default BackIcon;
