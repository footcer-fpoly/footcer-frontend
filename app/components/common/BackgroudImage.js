import React from 'react';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {yardImage} from '../../assets/Images';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import colors from '../../theme/colors';

export default function BackgroudImage({
  image,
  onPress,
  height,
  children,
  style,
}) {
  const uri = image?.imageType === 'local' ? image.path : image;
  return (
    <ImageBackground
      source={image ? {uri} : yardImage}
      style={[styles.header(height), style]}>
      <LinearGradient
        colors={['#00000000', '#00000070', '#00000090']}
        style={styles.center}>
        {children}
        {onPress && (
          <TouchableOpacity onPress={onPress} style={styles.iconEdit}>
            <Icon name="edit" size={18} color={colors.white} />
          </TouchableOpacity>
        )}
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  header: height => ({
    width: '100%',
    height: height,
    resizeMode: 'cover',
    justifyContent: 'center',
    // zIndex: 2,
  }),
  center: {...Styles.columnCenter, ...Styles.flex1},
  iconEdit: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    padding: scale(5),
    backgroundColor: colors.grayOpacity,
    borderRadius: 5,
  },
});
