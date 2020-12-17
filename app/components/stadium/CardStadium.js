import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
        <Icon color={colors.gray} name={iconName} size={scale(20)} />
        <Text numberOfLines={2} type={body3} style={styles.txtText}>
          {text}
          {subText}
        </Text>
      </View>
    );
  };
  return (
    <View key={item.stadiumId} style={styles.container}>
      <View>
        <Image source={{uri: item.image}} style={styles.image} />
        <Text type={headline5} style={styles.txtName}>
          {item?.stadiumName}
        </Text>
        <Text type={headline6} style={styles.txtCity}>
          {item?.city}
        </Text>
      </View>
      <View style={styles.body}>
        {rowItem('location-on', item?.address, styles.mrTop5)}
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
        <PrimaryButton
          onPress={() =>
            rootNavigation.navigate(STADIUM_DETAIL_SCREEN, {
              stadiumId: item.stadiumId,
            })
          }
          style={styles.btn}
          title={'Xem chi tiết'}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mrTop5: {
    marginTop: scale(5),
  },
  btn: {
    marginTop: scale(10),
    backgroundColor: colors.greenDark,
  },
  flex1: {flex: 1},
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    ...Styles.borderView(colors.greenDark, 1, 0),
    backgroundColor: colors.white,
    borderTopRightRadius: scale(10),
    borderTopLeftRadius: scale(10),
    overflow: 'hidden',
    marginRight: scale(10),
    elevation: 2,
    shadowColor: '#000',
    width: CARD_WIDTH,
    paddingBottom: scale(5),
  },
  image: {
    width: CARD_WIDTH,
    height: scale(100),
  },
  txtName: {
    position: 'absolute',
    bottom: scale(10),
    left: scale(10),
    color: colors.white,
  },
  txtCity: {
    position: 'absolute',
    top: scale(5),
    right: scale(5),
    color: colors.white,
    backgroundColor: colors.greenDark,
    paddingHorizontal: scale(10),
    borderRadius: scale(10),
    paddingVertical: scale(1),
  },
  body: {
    paddingHorizontal: scale(10),
  },
  txtText: {
    marginLeft: scale(5),
    flex: 1,
  },
});
