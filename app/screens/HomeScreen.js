import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  TextInput,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HeaderHome from '../components/HeaderHome';
import Stadium from '../components/Stadium';
import ItemMore from '../components/ItemMore';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>

        <View>
          <HeaderHome style={styles.header} />
        </View>
        <View style={styles.body}>
          <ItemMore title="Sân bóng quanh đây" />
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{flexDirection:'row',}}>
              {[
                {
                  urlImgStadium:
                    'https://www.foreverlawn.com/wp-content/uploads/2019/01/DSC_0006.jpg',
                  nameStadium: 'Sân Bóng Đá Mini Lữ Đoàn 596',
                  priceStadium: '150000',
                  addressStadium:
                    'Gardens, Cộng Hòa, Phường 12, Tân Bình, Hồ Chí Minh, Vietnam',
                  time: '10',
                  range: '2',
                },
                {
                  urlImgStadium:
                    'https://cdn1.sportngin.com/attachments/photo/1040/6534/Soccer_Field_large.jpg',
                  nameStadium: 'Sân bóng mini Chảo lửa',
                  priceStadium: '200000',
                  addressStadium:
                    '30 Phan Thúc Duyện, Phường 4, Tân Bình, Hồ Chí Minh',
                  time: '15',
                  range: '2,2',
                },
                {
                  urlImgStadium:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTWs7zmsySejcQq7afykaCFwYSi7yVPzRECPg&usqp=CAU',
                  nameStadium: 'Sân Bóng Đá Mini Thăng Long',
                  priceStadium: '180000',
                  addressStadium:
                    '2 Phan Thúc Duyện, Phường 4, Tân Bình, Hồ Chí Minh, Vietnam',
                  time: '19',
                  range: '2,6',
                },
              ].map((e, index) => (
                <View key={index.toString()}>
                  <Stadium
                    urlImgStadium={e.urlImgStadium}
                    nameStadium={e.nameStadium}
                    priceStadium={e.priceStadium}
                    addressStadium={e.addressStadium}
                    time={e.time}
                    range={e.range}
                  />
                </View>
              ))}
                 
          </ScrollView>
          <KeyboardAvoidingView><TextInput></TextInput></KeyboardAvoidingView>
       
        
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    zIndex: 10,
    backgroundColor: '#EDEDED',
  },
  header: {
    position: 'absolute',
    zIndex: 20,
  },
  body: {
    zIndex: -1,
    position: 'absolute',
    top: 295,
    paddingHorizontal: 15,
  },
});
