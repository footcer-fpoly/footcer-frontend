import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {View, Text} from 'react-native';
import {scale} from '../../helpers/size.helper';
import rootNavigator from '../../navigations/root.navigator';
import {TEAM_DETAIL_SCREEN} from '../../navigations/route-name';

export default function CardTeamConfirm({item}) {
  const goToTeamDetail = () => {
    rootNavigator.navigate(TEAM_DETAIL_SCREEN, {teamDetail: item});
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goToTeamDetail}>
        <Text>Phản hồi lời mời</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    marginBottom: scale(10),
    borderRadius: scale(5),
    paddingHorizontal: scale(10),
  },
});
