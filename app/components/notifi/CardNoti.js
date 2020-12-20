import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {keyNoti} from '../../helpers/data-local.helper';
import {convertDateTime} from '../../helpers/format.helper';
import {scale} from '../../helpers/size.helper';
import userHandleNoti from '../../hooks/userHandleNoti';
import rootNavigator from '../../navigations/root.navigator';
import {
  GAME_DETAIL_SCREEN,
  NOTIFICATION_SCREEN,
  ORDER_DETAIL_SCREEN,
  TEAM_DETAIL_SCREEN,
} from '../../navigations/route-name';
import colors from '../../theme/colors';
import {body2, body3, Text} from '../common/Text';

export default function CardNoti({item}) {
  const handleNoti = userHandleNoti(item);

  const navigateToScreen = () => {
    rootNavigator.navigate(handleNoti?.navigate, handleNoti?.params);
  };

  return (
    <TouchableOpacity onPress={navigateToScreen} style={styles.container}>
      <Icon
        name={handleNoti?.iconName}
        color={handleNoti?.color}
        size={scale(40)}
      />
      <View style={styles.content}>
        <Text type={body2}>{item?.title}</Text>
        <Text type={body3} style={styles.txt}>
          {item?.content}
        </Text>
        <Text type={body3} style={styles.txt}>
          {convertDateTime(item?.created_at)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginBottom: scale(10),
    borderRadius: scale(10),
    paddingHorizontal: scale(15),
    paddingVertical: scale(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    marginLeft: scale(10),
    flex: 1,
  },
  txt: {
    color: colors.gray,
    marginTop: scale(5),
    fontStyle: 'italic',
    flex: 1,
  },
});
