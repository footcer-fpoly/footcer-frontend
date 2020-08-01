import React, {useState} from 'react';
import {StyleSheet, Text, View, Picker, TouchableOpacity} from 'react-native';

import Match from '../Match/';
import Header from './Header/';

export default function TabFindOpponent() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.body}>
        <Match
          nameStadium="Sân Bóng Chảo Lửa"
          addressStadium="30 Phan Thúc Duyệt, Tân Bình"
          nameUser="Dương Hải Đăng"
          status="Đã có sân"
          time="20:30"
          date="26/06/2020"
          size="7"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEDED',
  },
});
