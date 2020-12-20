import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {direction} from '../../helpers/direction.helper';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import rootNavigation from '../../navigations/root.navigator';
import {STADIUM_DETAIL_SCREEN} from '../../navigations/route-name';
import colors from '../../theme/colors';
import PrimaryButton from '../common/PrimaryButton';
import {body3, headline5, headline6, Text} from '../common/Text';

const {width} = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;
export default function CardStadium({item, showMove}) {
  const rowItem = (iconName, text, style, subText) => {
    return (
      <View style={[styles.flexRow, style]}>
        <Icon color={colors.gray} name={iconName} size={scale(15)} />
        <Text numberOfLines={2} style={styles.txtText}>
          {text}
          {subText}
        </Text>
      </View>
    );
  };
  return (
    <View key={item.stadiumId} style={styles.container}>
      <View style={styles.warpperHeader}>
        <View style={styles.warpperInfo}>
          <Text type={headline5} style={styles.txtName}>
            {item?.stadiumName}
          </Text>
          {rowItem('location-on', item?.address, styles.mrTop5)}
          {rowItem('dashboard', item?.category, styles.mrTop5)}
          {showMove && (
            <View style={[styles.flexRow, styles.mrTop5]}>
              {rowItem(
                'transfer-within-a-station',
                item?.distance,
                styles.flex1,
                ' km',
              )}
              {rowItem('timelapse', item?.timer, styles.flex1, ' phút')}
            </View>
          )}
        </View>
        <Image source={{uri: item.image}} style={styles.image} />
      </View>
      <View style={styles.body}>
        <TouchableOpacity
          onPress={() =>
            rootNavigation.navigate(STADIUM_DETAIL_SCREEN, {
              stadiumId: item.stadiumId,
            })
          }
          style={styles.btnDetail}>
          <Text type={headline6} style={{color: colors.white}}>
            Xem chi tiết sân
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={direction(item.latitude, item.longitude, item.address)}
          style={styles.btnDirec}>
          <Text type={headline6} style={{color: colors.white}}>
            Chỉ đường
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mrTop5: {
    marginTop: scale(5),
  },
  flex1: {flex: 1},
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: scale(10),
    overflow: 'hidden',
    marginRight: scale(10),
    width: CARD_WIDTH,
    padding: scale(7),
  },
  image: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(10),
  },
  warpperHeader: {
    flexDirection: 'row',
  },
  warpperInfo: {
    flex: 1,
    marginRight: scale(5),
  },
  txtName: {
    color: colors.greenDark,
  },
  body: {
    flexDirection: 'row',
    marginTop: scale(20),
    marginBottom: scale(5),
  },
  txtText: {
    color: colors.gray,
    fontSize: scale(11),
    marginLeft: scale(5),
    flex: 1,
  },
  btnDetail: {
    ...Styles.columnCenter,
    backgroundColor: colors.orange,
    paddingHorizontal: scale(15),
    paddingVertical: scale(5),
    borderRadius: scale(60),
    marginRight: scale(10),
    flex: 1,
  },
  btnDirec: {
    backgroundColor: colors.blueDark,
    paddingHorizontal: scale(25),
    paddingVertical: scale(5),
    borderRadius: scale(60),
  },
});
