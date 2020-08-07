import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import ItemHeader from '../components/ItemHeader';
import TeamViewPager from '../navigation/TeamTabView';

export default class ProfileDetailScreen extends Component {
  render() {
    const nameTeam = 'Fpoly';
    const urlImgTeam =
      'https://scontent.fsgn5-4.fna.fbcdn.net/v/t1.0-9/99138497_2590351154572109_7512864550597689344_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=b6MnE2cwBrUAX_jkIId&_nc_ht=scontent.fsgn5-4.fna&oh=7199aec63fa5f92293d68c09eb63dc22&oe=5F332A48';
    return (
      <View style={{flex: 1}}>
        <ItemHeader titleHeader={'Chi tiết đội bóng'} />
        <View style={styles.headerContainer}>
          <Image style={styles.imgTeam} source={{uri: urlImgTeam}} />
          <Text style={styles.nameTeam}>{nameTeam}</Text>
        </View>
        <View style={styles.body}>
          <TeamViewPager />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#0AB134',
    paddingHorizontal: 25,
    paddingBottom: 20,
    alignItems: 'center',
  },
  imgTeam: {
    height: 85,
    width: 85,
    borderRadius: 85 / 2,
    borderWidth: 1,
    borderColor: 'white',
  },
  nameTeam: {
    color: 'white',
    paddingTop: 15,
    fontSize: 18,
  },
  body: {
    flex: 1,
  },
});
