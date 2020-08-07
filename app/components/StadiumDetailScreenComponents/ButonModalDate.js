import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function App() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };
  const date = 'Thứ 2 - 23/8';
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'center'}}>
      <TouchableOpacity style={styles.date} onPress={showDatePicker}>
        <Icon name="calendar-week" size={20} color={'#001C7E'} />
        <Text style={styles.txtdate}>{date}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  txtdate: {
    color: '#001C7E',
    fontSize: 13,
    paddingLeft: 10,
  },
  date: {
    flexDirection: 'row',
  },
});
