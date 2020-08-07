import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function YourMatch(props) {
  return (
    <View style={{alignItems: 'center'}}>
      <View style={styles.matchContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={{uri: props.urlImgTeam}} style={styles.imgTeam} />
            <View style={{marginLeft: 10}}>
              <Text style={{fontSize: 16, color: '#0AB134'}}>
                {props.nameTeam}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#0AB134',
                  borderRadius: 7,
                  textAlign: 'center',
                  marginTop: 5,
                  borderWidth: 0.5,
                }}>
                {props.size}
              </Text>
            </View>
          </View>
          <View>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 5,
                padding: 5,
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <Text>CN</Text>
              <Text>12</Text>
            </View>
            <Text
              style={{backgroundColor: '#EDEDED', padding: 5, borderRadius: 5}}>
              20:20
            </Text>
          </View>
        </View>
        <View style={styles.matchAddressContainer}>
          <Icon name="place" color="#FF0000" size={18} />
          <Text Text numberOfLines={1} style={styles.textMatchAddress}>
            {props.addressStadium}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="public" color="#0AB134" size={18} />
            <Text Text numberOfLines={1} style={styles.textMatchAddress}>
              {props.private}
            </Text>
          </View>
          <Text>{props.status}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  matchContainer: {
    backgroundColor: '#fff',
    width: '95%',
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
    padding: 10,
  },
  imgTeam: {
    height: 85,
    width: 85,
    borderRadius: 5,
  },
  matchAddressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  textMatchAddress: {
    marginLeft: 5,
  },
});
