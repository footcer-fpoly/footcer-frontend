import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Teams from './Teams';

export default function JoinModal() {
  const [nameTeam, setNameTeam] = useState('Đội tuyển U19');
  const [date, setDate] = useState('Thứ 3, 20/3/2029');
  const [nameStadium, setNameStadium] = useState('Sân bóng Chảo Lửa');
  const [addressStadium, setAddressStadium] = useState(
    '30 Phan Thúc Duyệt, Tân Bình',
  );
  const data = [
    {
      urlImgTeam:
        'https://media.urbanistnetwork.com/saigoneer/article-images/2019/Apr/5/VietnamNationalTeam_SGRb.jpg',
      nameTeam: 'Đội tuyển quốc gia',
    },
    {
      urlImgTeam:
        'https://s3-ap-southeast-1.amazonaws.com/esquire-sg/2018/06/18154441/vietnam-football-players-uzbekistan-esquire-singapore.jpg',
      nameTeam: 'Đội tuyển U19',
    },
    {
      urlImgTeam:
        'https://media.urbanistnetwork.com/saigoneer/article-images/2019/Apr/5/VietnamNationalTeam_SGRb.jpg',
      nameTeam: 'Đội tuyển quốc gia',
    },
    {
      urlImgTeam:
        'https://s3-ap-southeast-1.amazonaws.com/esquire-sg/2018/06/18154441/vietnam-football-players-uzbekistan-esquire-singapore.jpg',
      nameTeam: 'Đội tuyển U19',
    },
  ];
  const renderTeams = ({item}) => (
    <Teams urlImgTeam={item.urlImgTeam} nameTeam={item.nameTeam} />
  );
  return (
    <View style={styles.container}>
      <Text style={styles.tilte}>Xác nhận tham gia trận đấu</Text>
      <View style={styles.bodyContainer}>
        <Text style={styles.nameStadium}>{nameStadium}</Text>
        <Text style={styles.date}>{date}</Text>
        <View style={styles.row}>
          <Icon name={'map-marker-alt'} size={13} color={'#FF0000'} />
          <Text style={styles.addressStadium}>{addressStadium}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.request}>
            Gửi đề nghị tham gia trận đấu với {nameTeam}
          </Text>
          <Text style={styles.chooseTeam}>Tham gia trận đấu với vai trò</Text>
          <FlatList
            style={{marginTop: 10}}
            horizontal
            data={data}
            renderItem={renderTeams}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.btnCancel}>
            <Text style={{color: '#fff'}}>Trở về</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnAccept}>
            <Text style={{color: '#fff'}}>Đồng ý</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingBottom: 15,
  },
  bodyContainer: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  tilte: {
    fontSize: 20,
    color: '#fff',
    backgroundColor: '#0AB134',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 10,
    textAlign: 'center',
  },
  nameStadium: {
    fontSize: 20,
    color: '#676767',
  },
  date: {
    fontSize: 16,
    color: '#676767',
    marginTop: 5,
  },
  addressStadium: {
    fontSize: 14,

    color: '#676767',
    marginLeft: 10,
  },
  request: {
    fontSize: 14,
    color: '#676767',
    marginTop: 5,
  },
  btnCancel: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#AAAAAA',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 7,
  },
  btnAccept: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#0AB134',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 7,
  },
  chooseTeam: {
    marginTop: 5,
  },
});
