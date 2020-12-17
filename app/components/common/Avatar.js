import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {logoTeamImage} from '../../assets/Images';
import Styles from '../../helpers/styles.helper';
import colors from '../../theme/colors';
import ModalImageViewer from './ModalImageViewer';

export default function Avatar({
  image,
  onPressImage,
  onPress,
  size,
  borderWidth,
  borderColor,
  style,
  disabledImage,
}) {
  const uri = image?.imageType === 'local' ? image.path : image;
  const [modalViewImg, setmodalViewImg] = useState({
    image: [{url: uri}],
    visible: false,
  });
  const toggleModal = () => {
    setmodalViewImg({
      ...modalViewImg,
      visible: !modalViewImg.visible,
    });
  };
  return (
    <View style={[styles.avatar(size), style]}>
      <TouchableOpacity
        onPress={onPressImage ? onPressImage : toggleModal}
        disabled={disabledImage}>
        <Image
          source={image ? {uri} : logoTeamImage}
          style={[
            styles.avatar(size),
            {borderWidth: borderWidth, borderColor: borderColor},
          ]}
        />
      </TouchableOpacity>
      {onPress && (
        <TouchableOpacity
          hitSlop={styles.hitSlop}
          onPress={onPress}
          style={styles.iconEdit}>
          <Icon style={styles.iconHeader} name="edit" size={13} />
        </TouchableOpacity>
      )}
      <ModalImageViewer
        onDismiss={toggleModal}
        visible={modalViewImg.visible}
        images={modalViewImg.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: size => ({
    ...Styles.borderRadiusCircle(size),
  }),
  hitSlop: {top: 10, left: 10, right: 10, bottom: 10},
  iconEdit: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.grayLight,
    ...Styles.borderRadiusCircle(20),
    ...Styles.columnCenter,
  },
});
