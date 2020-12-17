import React, {useState} from 'react';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {yardImage} from '../../assets/Images';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import colors from '../../theme/colors';
import ModalImageViewer from './ModalImageViewer';

export default function BackgroudImage({
  image,
  onPress,
  height,
  children,
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
    <TouchableOpacity disabled={disabledImage} onPress={toggleModal}>
      <ImageBackground
        source={image ? {uri} : yardImage}
        style={[styles.header(height), style]}>
        <LinearGradient colors={colors.blackGradient} style={styles.center}>
          {children}
          {onPress && (
            <TouchableOpacity onPress={onPress} style={styles.iconEdit}>
              <Icon name="edit" size={18} color={colors.white} />
            </TouchableOpacity>
          )}
        </LinearGradient>
        <ModalImageViewer
          onDismiss={toggleModal}
          visible={modalViewImg.visible}
          images={modalViewImg.image}
        />
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: (height) => ({
    width: '100%',
    height: height,
    resizeMode: 'cover',
    justifyContent: 'center',
    // zIndex: 2,
  }),
  center: {...Styles.columnCenter, ...Styles.flex1},
  iconEdit: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    padding: scale(5),
    backgroundColor: colors.grayOpacity,
    borderRadius: 5,
  },
});
