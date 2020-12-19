import React from 'react';
import {Linking, Platform, StyleSheet, View} from 'react-native';
import {callPhone} from '../../helpers/call-phone.helper';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import rootNavigator from '../../navigations/root.navigator';
import {REVIEW_STADIUM_SCREEN} from '../../navigations/route-name';
import colors from '../../theme/colors';
import ButtonGradient from './ButtonGradient';

export default function BlockNameStadium({hasOrder, data}) {
  const navigateToReview = () => {
    rootNavigator.navigate(REVIEW_STADIUM_SCREEN, {item: data});
  };
  const onPressDirection = (
    latitude = 0,
    longitude = 0,
    label = 'Footcer',
  ) => async () => {
    const url = Platform.select({
      android: 'geo:' + latitude + ',' + longitude + '?q=' + label,
    });
    const isLinkingSupport = await Linking.canOpenURL(url);
    if (isLinkingSupport) {
      Linking.openURL(url);
    } else {
      const urlGoogleMap = `https://www.google.com/maps/dir/Current+Location/${latitude},${longitude}`;
      Linking.openURL(urlGoogleMap);
    }
  };
  return (
    <View style={styles.container}>
      {hasOrder && (
        <ButtonGradient
          backgroundColor={colors.yellowDark}
          iconName="star-circle"
          title="Đánh giá sân"
          onPress={navigateToReview}
        />
      )}
      <ButtonGradient
        backgroundColor={colors.blueDark}
        iconName="map-search-outline"
        title="Chỉ đường"
        onPress={onPressDirection(
          data?.latitude,
          data?.longitude,
          data?.address,
        )}
      />
      <ButtonGradient
        backgroundColor={colors.orange}
        iconName="cellphone-sound"
        title="Liên hệ"
        onPress={callPhone(data?.user?.phone)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    ...Styles.columnCenter,
    backgroundColor: colors.white,
    borderRadius: scale(8),
    paddingHorizontal: scale(24),
    marginTop: scale(-50),
    marginHorizontal: scale(20),
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: scale(4),
    elevation: 2,
    zIndex: 1,
    paddingVertical: scale(20),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
