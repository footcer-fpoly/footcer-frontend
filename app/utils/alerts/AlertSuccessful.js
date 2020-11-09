import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import colors from '../../theme/colors';

export default function AlertSuccessful({visible, text}) {
  return (
    <Modal
      statusBarTranslucent={true}
      useNativeDriver={true}
      isVisible={visible}>
      <View style={styles.container}>
        <AntDesign name="checkcircle" color={colors.main} size={scale(40)} />
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
