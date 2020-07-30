import React, { Component } from 'react'
import {
  View,
  Text,
  StatusBar,
  TextInput,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ItemMatch from './ItemMatch';

export default class Match extends Component {
  render() {
    const {nameStadium, addressStadium, time, date, size} = this.props;
    return (
      <View style={styles.matchContainer}>
        <View style={styles.infoStadiumContainer}>
          <Text style={styles.textMatchTitle}>{nameStadium}</Text>
          <View style={styles.matchAddressContainer}>
            <Icon name="place" color="#FF0000" size={18} />
            <Text Text numberOfLines={1} style={styles.textMatchAddress}>
              {addressStadium}
            </Text>
          </View>
        </View>
        <View style={styles.matchInfoContainer}>
          <ItemMatch
            urlImg="https://images.kienthuc.net.vn/zoom/800/uploaded/ctvcongdongtre/2019_11_23/4/he-lo-nhan-sac-that-khong-ngo-hot-girl-dong-phuc-10x-ha-nam-hinh-7.jpg"
            nameTeam="Dương Hải Đăng"
            status="Đã có sân"
          />
          <View style={styles.infoMatch}>
            <Text style={styles.textTime}>{time}</Text>
            <Text style={styles.textDate}>{date}</Text>
            <Text style={styles.textMatchSize}>
              {size} vs {size}
            </Text>
          </View>
          <ItemMatch
            urlImg="https://images.kienthuc.net.vn/zoom/800/uploaded/ctvcongdongtre/2019_11_23/4/he-lo-nhan-sac-that-khong-ngo-hot-girl-dong-phuc-10x-ha-nam-hinh-7.jpg"
            nameTeam="Dương Quốc Hải"
            status=""
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  matchContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 150,
    backgroundColor: '#fff',
    // width: '100%',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginTop: 10,
    marginHorizontal: 12,
  },
  infoStadiumContainer: {
    alignItems: 'center',
  },
  matchAddressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  matchInfoContainer: {
    flexDirection: 'row',
  },

  infoMatch: {
    alignItems: 'center',
    margin: 15,
  },

  textMatchSize: {
    color: '#1549FF',
    marginTop: 5,
    fontSize: 12,
  },
  textDate: {
    marginTop: 5,
    fontSize: 12,
    color: '#000',
  },
  textTime: {
    fontSize: 12,
    color: '#000',
  },
  textMatchTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 15,
    color: '#0AB134',
    alignContent: 'center',
  },
  textMatchAddress: {
    fontSize: 13,
    color: '#676767',
    marginLeft: 5,
    maxWidth: 300,
  },
});
