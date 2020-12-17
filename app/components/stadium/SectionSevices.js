import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {listSeviceStadium} from '../../helpers/data-local.helper';
import ItemServeice from '../StadiumDetailScreenComponents/ItemServeice';

export default function SectionSevices() {
  const renderItemService = ({item}) => (
    <ItemServeice txtService={item.txtService} imgService={item.imgService} />
  );
  return (
    <View style={styles.viewSection}>
      <Text style={styles.title}>Dịch vụ</Text>
      <FlatList
        style={{marginTop: 10}}
        data={listSeviceStadium}
        renderItem={renderItemService}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  viewSection: {
    // flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 14,
    textTransform: 'capitalize',
  },
});
