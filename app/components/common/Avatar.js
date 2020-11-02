import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {logoTeamImage} from '../../assets/Images';
import Styles from '../../helpers/styles.helper';
import colors from '../../theme/colors';

export default function Avatar({
  image,
  onPress,
  size,
  borderWidth,
  borderColor,
  style,
  iconEdit,
  disabledImage,
}) {
  const uri = image?.imageType === 'local' ? image.path : image;
  return (
    <View style={[styles.avatar(size), style]}>
      <TouchableOpacity onPress={onPress} disabled={disabledImage}>
        <Image
          source={image ? {uri} : logoTeamImage}
          style={[
            styles.avatar(size),
            {borderWidth: borderWidth, borderColor: borderColor},
          ]}
        />
      </TouchableOpacity>
      {iconEdit && (
        <TouchableOpacity onPress={onPress} style={styles.iconEdit}>
          <Icon style={styles.iconHeader} name="edit" size={13} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: size => ({
    ...Styles.borderRadiusCircle(size),
  }),
  iconEdit: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.grayLight,
    ...Styles.borderRadiusCircle(20),
    ...Styles.columnCenter,
  },
});
