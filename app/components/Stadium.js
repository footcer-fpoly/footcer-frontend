import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  TextInput,
  Image,
  SafeAreaView,
  StyleSheet,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Filed extends Component {
  render() {
    const {urlImgStadium, nameStadium, priceStadium, addressStadium, time, range} = this.props;
    return (
      <View style={styles.stadiumContainer}>
        <View style={styles.stadium}>
          <Image
            style={styles.imgstadium}
            source={{
              uri: urlImgStadium,
            }}
          />
          <View style={styles.infoStadiumContainer}>
            <View style={styles.namePriceStadiumContainer}>
              <Text style={styles.nameStadium} numberOfLines={1}>
                {nameStadium}
              </Text>
              <Text style={styles.priceStadium}>{priceStadium} đ/h</Text>
              {/* <Text>đ/h</Text> */}
            </View>

            <View style={styles.addressStadiumContainer}>
              <Icon name="place" color="#FF0000" size={15} />
              <Text style={styles.addreess} numberOfLines={1}>
                {addressStadium}
              </Text>
            </View>

            <View style={styles.timeRangeStadiumContainer}>
              <Icon name="schedule" size={15} />
              <Text style={styles.timeRange}>
                {time}p - {range}km
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              borderTopWidth: 0.5,
              borderTopColor: '#707070',
            }}>
            <Text style={styles.go}>Đến sân ngay</Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  stadiumContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.23,
    // shadowRadius: 2.62,
    // elevation: 4,
    marginRight: 15,
  },
  imgstadium: {
    height: 150,
    width: 300,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // overflow: 'hidden',
  },
  namePriceStadiumContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addressStadiumContainer: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  timeRangeStadiumContainer: {
    flexDirection: 'row',
    marginTop: 3,
    paddingBottom: 10,
  },
  go: {
    paddingRight: 15,
    alignItems: 'center',
    paddingVertical: 10,
    textAlign: 'right',
    fontSize: 13,
    color: '#0AB134',
  },
  infoStadiumContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  nameStadium: {
    fontSize: 14,
    maxWidth: 200,
  },
  priceStadium: {
    fontSize: 13,
  },
  addreess: {
    fontSize: 12,
    paddingLeft: 5,
    maxWidth: 250,
  },
  timeRange: {
    fontSize: 12,
    paddingLeft: 5,
  },
});
