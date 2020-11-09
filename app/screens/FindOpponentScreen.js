import React from 'react';
import {StyleSheet, View} from 'react-native';
import FindOpponentTabView from '../navigation/FindOpponentTabView';

export default function FindOpponentScreen() {
  return (
    <View style={styles.container}>
      <FindOpponentTabView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
