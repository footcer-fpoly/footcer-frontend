import React, {Component} from 'react';
import {View, SafeAreaView, Image, Text} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class LocationsScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            width: 414,
            height: 100,
            alignItems: 'center',
            borderBottomWidth: 0.25,
            borderColor: '#707070',
          }}>
          <View style={{marginHorizontal: 5}}>
            <Image
              source={require('../assets/images/sanco.jpg')}
              style={{width: 100, height: 85, borderRadius: 7}}
              resizeMode="cover"
            />
          </View>
          <View style={{marginHorizontal: 16}}>
            <Text
              style={{
                fontSize: 16,
                color: '#0AB134',
                marginBottom: 10,
              }}>
              Sân bóng Chảo Lửa
            </Text>
            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <FontAwesome5 name="map-marker-alt" color="red" size={15} />
              <Text
                style={{fontSize: 15, textAlign: 'center', marginLeft: 5}}>
                30 Phan Thúc Duyện, Tân Bình
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <FontAwesome5 name="clock" color="black" size={15} />
              <Text
                style={{fontSize: 15, textAlign: 'center', marginLeft: 5}}>
                Sân bóng Chảo Lửa
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
