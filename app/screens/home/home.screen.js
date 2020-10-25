import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>haha</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 10,
    backgroundColor: '#EDEDED',
  },
  header: {
    zIndex: 20,
  },
  body: {
    zIndex: -1,
    paddingHorizontal: 15,
  },
});
