import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function InfoMatch() {
  const [icon1, icon2, icon3, icon4] = [
    'futbol',
    'clock',
    'map-marker',
    'globe-asia',
  ];
  const [date, setDate] = useState('28/6/2020');
  const [time, setTime] = useState('20:30');
  const [status, setStatus] = useState('Đang tìm đối thủ');
  const [stadium, setStadium] = useState('Sân bóng Chảo Lửa');
  const [privacy, setPrivacy] = useState('Công khai');
  return (
    <View>
      <Text style={styles.txtDetail}>Chi tiết trận đấu</Text>
      <View style={styles.viewSection}>
        <View style={styles.itemRow}>
          <Icon name={icon1} size={22} />
          <Text style={styles.txtItem}>{status}</Text>
        </View>
        <View style={styles.itemRow}>
          <Icon name={icon2} size={22} />
          <Text style={styles.txtItem}>
            {time} - {date}
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Icon name={icon3} size={22} />
          <Text style={styles.txtItem}>{stadium}</Text>
        </View>
        <View style={styles.itemRow}>
          <Icon name={icon4} size={22} />
          <Text style={styles.txtItem}>{privacy}</Text>
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
