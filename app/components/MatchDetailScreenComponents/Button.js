import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import JoinModal from './JoinModal';

export default function Button(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const hideModal = () => {
    setModalVisible(false);
  };
  return (
    <View>
      <Modal isVisible={isModalVisible} onBackdropPress={hideModal}>
        <JoinModal />
      </Modal>
      <TouchableOpacity
        style={props.value === 0 ? styles.btnDelete : styles.btnHide}>
        <Text style={styles.txt}>XOÁ TRẬN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={toggleModal}
        style={props.value === 1 ? styles.btnJoin : styles.btnHide}>
        <Text style={styles.txt}>THAM GIA</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnJoin: {
    marginTop: 20,
    backgroundColor: '#0AB134',
    alignItems: 'center',
    paddingVertical: 10,
  },
  btnHide: {
    display: 'none',
  },
  txt: {
    fontSize: 16,
    color: '#fff',
  },
  btnDelete: {
    marginTop: 20,
    backgroundColor: '#FF0000',
    alignItems: 'center',
    paddingVertical: 10,
  },
});
