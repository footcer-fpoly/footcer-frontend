import React, {Component} from 'react';
import {Text, SafeAreaView, View, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native';

export default function Item({item, navigation}) {
  return (
    <View style={styles.stadiumContainer}>
      <View style={styles.stadium}>
        <Image
          style={styles.imgstadium}
          source={{
            uri: item.image,
          }}
        />
        <View style={styles.infoStadiumContainer}>
          <View style={styles.nameStadiumContainer}>
            <Text style={styles.nameStadium} numberOfLines={1}>
              {item.stadiumName}
            </Text>
          </View>

          <View style={styles.addressStadiumContainer}>
            <Icon name="place" color="#FF0000" size={15} />
            <Text style={styles.addreess} numberOfLines={1}>
              {item.address}
            </Text>
          </View>

          <View style={styles.timeRangeStadiumContainer}>
            <Icon name="schedule" size={15} />
            <Text style={styles.timeRange}>
              {item.timer}p - {item.distance}km
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            borderTopWidth: 0.5,
            borderTopColor: '#707070',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('StadiumDetail', {item})}>
            <Text style={styles.go}>Xem chi tiết</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  stadiumContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    margin: 10,
  },
  imgstadium: {
    height: 200,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // overflow: 'hidden',
  },
  nameStadiumContainer: {
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
    paddingTop: 5,
  },
  nameStadium: {
    fontSize: 14,
    maxWidth: '90%',
  },
  priceStadium: {
    fontSize: 13,
  },
  addreess: {
    fontSize: 12,
    paddingLeft: 5,
    maxWidth: '90%',
  },
  timeRange: {
    fontSize: 12,
    paddingLeft: 5,
  },
});
