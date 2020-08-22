import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Spinner from "react-native-spinkit";

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const Loading = ({ visible }) => {
  return (
    <View style={visible ? styles.container : { display: 'none' }}>
      <View style={styles.overlay}></View>
      <Spinner isVisible={true} size={80} type={'Circle'} color={'white'} />
    </View>
  );

}
export default Loading;
const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    position: 'absolute',
  },
  overlay: {
    position: 'absolute',
    flex: 1,
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'black',
    opacity: 0.6,
  },
});
