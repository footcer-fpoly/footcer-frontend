import React from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../theme/colors';
import dimens from '../../theme/dimens';

export default function ModalImageViewer({images, visible, index, onDismiss}) {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      presentationStyle="fullScreen"
      statusBarTranslucent={true}
      onDismiss={onDismiss}
      onRequestClose={onDismiss}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onDismiss} style={styles.iconBack}>
          <Icon size={30} name="close" color={colors.white} />
        </TouchableOpacity>
        <ImageViewer
          index={index}
          saveToLocalByLongPress={false}
          imageUrls={images}
        />
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {backgroundColor: 'black', flex: 1},
  iconBack: {
    position: 'absolute',
    top: dimens.STATUS_BAR_HEIGHT,
    left: 10,
    zIndex: 1,
  },
});
