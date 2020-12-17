import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import Modal from 'react-native-modal';

export default function AlertError({visible, text, dismiss}) {
  useEffect(() => {
    setTimeout(() => dismiss(), 2500);
  }, [visible]);
  return (
    <Modal
      statusBarTranslucent={true}
      useNativeDriver={true}
      isVisible={visible}>
      <View style={styles.container}>
        <MaterialIcons name="error" color={'#e74c3c'} size={50} />
        <Text style={styles.text}>{text}</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    ...Styles.columnCenter,
    backgroundColor: colors.white,
    borderRadius: scale(5),
    paddingHorizontal: scale(20),
    paddingVertical: scale(30),
    marginHorizontal: scale(30),
  },

  text: {
    marginTop: 20,
    color: '#05375a',
    fontSize: 18,
    textAlign: 'center',
  },
});
