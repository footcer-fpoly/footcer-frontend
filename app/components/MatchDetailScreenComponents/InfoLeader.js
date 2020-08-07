import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function InfoLeader() {
  const [icon1, icon2] = ['user', 'phone'];
  const [name, setName] = useState('Dương Hải Đăng');
  const [phone, setPhone] = useState('0789301100');
  return (
    <View>
      <Text style={styles.txtDetail}>Thông tin liên hệ</Text>
      <View style={styles.viewSection}>
        <View style={styles.itemRow}>
          <Icon name={icon1} size={22} />
          <Text style={styles.txtItem}>{name}</Text>
        </View>
        <View style={styles.itemRow}>
          <Icon name={icon2} size={22} />
          <Text style={styles.txtItem}>{phone}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  txtDetail: {
    fontSize: 14,
    marginHorizontal: 10,
    marginTop: 10,
  },
  viewSection: {
    backgroundColor: 'white',
    marginTop: 10,
  },
  itemRow: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#67676767',
    borderBottomWidth: 0.5,
  },
  txtItem: {
    marginLeft: 20,
    fontSize: 14,
  },
});
