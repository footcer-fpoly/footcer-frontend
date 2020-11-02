import React from 'react';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import {scale} from '../../helpers/size.helper';
import colors from '../../theme/colors';
import {body3, headline5, Text} from '../common/Text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Styles from '../../helpers/styles.helper';
import spacing from '../../theme/spacing';

export default function ItemTeamMember({title, onPress, style, textStyle}) {
  return (
    <View style={styles.warpperItemMem}>
      <View>
        <Image
          style={styles.imgMember}
          source={{
            uri:
              'https://upload.wikimedia.org/wikipedia/en/8/8e/Vietnam_national_football_team.png',
          }}
        />
        <TouchableOpacity style={styles.iconRemoveMem}>
          <Icon name="close-circle" size={20} color={colors.gray} />
        </TouchableOpacity>
      </View>
      <Text type={body3}>Huỳnh Bình</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  warpperItemMem: {
    ...Styles.columnCenter,
    marginRight: spacing.large,
  },
  imgMember: {
    ...Styles.borderRadiusCircle(50),
    marginBottom: spacing.medium,
  },
  iconRemoveMem: {
    position: 'absolute',
    top: 0,
    right: -8,
  },
});
