import React from 'react';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import {scale} from '../../helpers/size.helper';
import colors from '../../theme/colors';
import {body3, headline5, Text} from '../common/Text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Styles from '../../helpers/styles.helper';
import spacing from '../../theme/spacing';
import Avatar from '../common/Avatar';

export default function ItemTeamMember({
  image,
  size,
  name,
  onPress,
  status,
  position,
  onPressImage,
  disabledImage,
}) {
  return (
    <View style={styles.warpperItemMem}>
      <View>
        <Avatar
          image={image}
          size={size}
          disabledImage={disabledImage}
          borderWidth={2}
          borderColor={colors.black}
          onPressImage={onPressImage}
        />
        {onPress && (
          <TouchableOpacity style={styles.iconRemoveMem}>
            <Icon name="close-circle" size={20} color={colors.gray} />
          </TouchableOpacity>
        )}
      </View>
      <Text type={headline5} numberOfLines={1} style={styles.txtName}>
        {name}
      </Text>
      <Text
        type={body3}
        numberOfLines={1}
        style={styles.txtStatus(!status ? colors.orange : colors.black)}>
        {status ? position : 'Chờ xác nhận'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  warpperItemMem: {
    ...Styles.columnCenter,
    marginRight: spacing.large,
    alignItems: 'center',
  },
  iconRemoveMem: {
    position: 'absolute',
    top: 0,
    right: -8,
  },
  txtName: {
    marginTop: spacing.small,
    maxWidth: scale(100),
  },
  txtStatus: (color = colors.black) => ({
    marginTop: spacing.tiny,
    maxWidth: scale(120),
    color: color,
  }),
});
