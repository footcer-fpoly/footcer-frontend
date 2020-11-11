import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import {body3, Text} from '../../components/common/Text';
import colors from '../../theme/colors';

const BookFieldScreen = () => {
  return (
    <MapView
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={styles.map}
      // region={{
      //   latitude: 37.78825,
      //   longitude: -122.4324,
      //   latitudeDelta: 0.015,
      //   longitudeDelta: 0.0121,
      // }}
    >
      <Marker
        coordinate={{
          latitude: 10.775104,
          longitude: 106.640483,
        }}
        // image={}
        title="Test Title"
        // description="This is the test description"
      >
        <Callout tooltip>
          <View>
            <View style={styles.bubble}>
              <Text type={body3}>Haiâi</Text>
              <Text type={body3}>Haiâi</Text>
            </View>
          </View>
        </Callout>
      </Marker>
    </MapView>
  );
};
export default BookFieldScreen;
const styles = StyleSheet.create({
  map: {
    height: '100%',
  },
  bubble: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.white,
  },
});
