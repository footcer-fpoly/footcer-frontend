import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ItemHeader from '../components/ItemHeader';
import InfoMatch from '../components/MatchDetailScreenComponents/InfoMatch';
import InfoLeader from '../components/MatchDetailScreenComponents/InfoLeader';
import Button from '../components/MatchDetailScreenComponents/Button';

export default function MatchDetailScreen() {
  const [nameTeam, setNameTeam] = useState('Poly HCM');
  const [date, setDate] = useState('28/6/2020');
  const [time, setTime] = useState('20:30');
  const [size, setSize] = useState('7');

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ItemHeader titleHeader="Chi tiết trận đấu" />
        <View style={styles.nameTimeSize}>
          <View style={styles.nameTime}>
            <Text style={styles.txtName}>{nameTeam}</Text>
            <Text style={styles.txtDateTime}>
              {date} - {time}
            </Text>
          </View>
          <Text style={styles.txtSize}>
            {size} vs {size}
          </Text>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.viewSectionCenter}>
          <Text style={styles.txtTitle}>Thông tin</Text>
        </View>
        <InfoMatch />
        <InfoLeader />
        <Button value={0} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEDED',
  },
  headerContainer: {
    backgroundColor: '#0AB134',
  },
  nameTimeSize: {
    marginHorizontal: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtName: {
    fontSize: 15,
    color: '#fff',
  },
  txtDateTime: {
    fontSize: 13,
    color: '#fff',
  },
  txtSize: {
    fontSize: 12,
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  viewSectionCenter: {
    backgroundColor: 'white',
    paddingVertical: 10,
    alignItems: 'center',
  },
  txtTitle: {
    fontSize: 16,
  },
});
