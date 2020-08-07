import React, {useState} from 'react';
import {StyleSheet, Text, View, Picker, TouchableOpacity} from 'react-native';
import {LocaleConfig, Calendar} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome5';

LocaleConfig.locales['vi'] = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthNamesShort: [
    'Th1.',
    'Th2.',
    'Th3',
    'Th4',
    'Th5',
    'Th6',
    'Th7',
    'Th8',
    'Th9',
    'Th10',
    'Th11',
    'Th12',
  ],
  dayNames: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'],
  dayNamesShort: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'vi';

export default function Header() {
  const [selected, setSelected] = useState('');
  const onDayPress = day => {
    setSelected(day.dateString);
  };
  const [selectedValue, setSelectedValue] = useState('Trận đấu sắp tới');
  return (
    <View>
      <View style={styles.dateContainer}>
        <Picker
          selectedValue={selectedValue}
          style={{height: 50, width: 180, marginHorizontal: -10}}
          mode={'dropdown'}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
          <Picker.Item label="Trận đấu sắp tới" value="1" />
          <Picker.Item label="Hôm qua" value="2" />
        </Picker>
        <TouchableOpacity style={styles.btnDate}>
          <Text style={styles.txtDate}>Date</Text>
          <Icon name={'calendar-alt'} size={16} />
        </TouchableOpacity>
      </View>
      <Calendar
        minDate={'2020/07/1'}
        maxDate={'2020/12/30'}
        onDayPress={onDayPress}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: '#0AB134',
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  btnDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtDate: {
    marginRight: 5,
    fontSize: 12,
  },
});
