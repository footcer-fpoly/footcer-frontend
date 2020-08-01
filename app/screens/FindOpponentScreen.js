import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FindOpponentTabView from '../navigation/FindOpponentTabView';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

export default function FindOpponentScreen() {
  return (
    <View style={styles.container}>
      <FindOpponentTabView />
      <ActionButton
        buttonColor="rgba(231,76,60,1)"
        onPress={() => console.log('abc')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
