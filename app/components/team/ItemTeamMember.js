import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import useText from '../../hooks/useText';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import Avatar from '../common/Avatar';
import {body3, headline5, Text} from '../common/Text';

export default function ItemTeamMember({
  style,
  image,
  size,
  name,
  onPress,
  status,
  position,
  onPressImage,
  disabledImage,
  me,
}) {
  const t = useText();
  const renderPosition = () => {
    if (status) {
      if (position === t.leader) {
        return {
          text: position || t.leader,
          color: colors.yellowDark,
        };
      }
      return {
        text: position || t.member,
        color: colors.greenDark,
      };
    } else {
      return {
        text: 'Chờ xác nhận',
        color: colors.orange,
      };
    }
  };
  return (
    <View style={[styles.warpperItemMem, style]}>
      <View>
        <Avatar
          image={image}
          size={size}
          disabledImage={disabledImage}
          borderWidth={3}
          borderColor={me ? colors.main : colors.black}
          onPressImage={onPressImage}
        />
        {onPress && (
          <TouchableOpacity onPress={onPress} style={styles.iconRemoveMem}>
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
        style={styles.txtStatus(renderPosition().color)}>
        {position && renderPosition().text}
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
