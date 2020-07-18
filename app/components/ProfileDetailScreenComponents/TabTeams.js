import React, {Component} from 'react';
import {Text, StyleSheet, View, TextInput, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Team from './Team';

export default class TabTeams extends React.Component {
  render() {
    return (
      <View style={{backgroundColor: '#EDEDED', flex: 1}}>
        <View style={styles.search}>
          <Icon
            name="search"
            color="black"
            size={25}
            style={{paddingVertical: 10, paddingHorizontal: 20}}
          />
          <TextInput placeholder="Tìm đội bóng" style={styles.textInput} />
        </View>
        <View
          style={{
            backgroundColor: '#FFF',
            marginHorizontal: 15,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          }}>
          {/* <View
            style={{
              flex: 1,
              marginHorizontal: 15,
              backgroundColor: '#fff',
              paddingHorizontal: 15,
            }}> */}
          <Text style={{fontSize: 18, color: '#676767', padding: 15}}>
            DANH SÁCH ĐỘI THAM GIA
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginHorizontal: 15,
            backgroundColor: 'white',
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
          }}>
          {[
            {
              urlImgTeam:
                'https://media.urbanistnetwork.com/saigoneer/article-images/2019/Apr/5/VietnamNationalTeam_SGRb.jpg',
              nameTeam: 'Đội tuyển quốc gia',
              level: 'Quản trị viên',
            },
            {
              urlImgTeam:
                'https://s3-ap-southeast-1.amazonaws.com/esquire-sg/2018/06/18154441/vietnam-football-players-uzbekistan-esquire-singapore.jpg',
              nameTeam: 'Đội tuyển U19',
              level: 'Thành viên',
            },
            {
              urlImgTeam:
                'https://media.urbanistnetwork.com/saigoneer/article-images/2019/Apr/5/VietnamNationalTeam_SGRb.jpg',
              nameTeam: 'Đội tuyển quốc gia',
              level: 'Quản trị viên',
            },
            {
              urlImgTeam:
                'https://s3-ap-southeast-1.amazonaws.com/esquire-sg/2018/06/18154441/vietnam-football-players-uzbekistan-esquire-singapore.jpg',
              nameTeam: 'Đội tuyển U19',
              level: 'Thành viên',
            },
          ].map((e, index) => (
            <View key={index.toString()}>
              <Team
                urlImgTeam={e.urlImgTeam}
                nameTeam={e.nameTeam}
                level={e.level}
              />
            </View>
          ))}
        </ScrollView>
      </View>
      //   </View>
    );
  }
}

const styles = StyleSheet.create({
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    margin: 15,
    backgroundColor: '#FFF',
  },
  textInput: {
    fontSize: 16,
    //   color: '#676767',
  },
});
