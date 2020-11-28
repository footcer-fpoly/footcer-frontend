import React from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {scale} from '../../../helpers/size.helper';
import Styles from '../../../helpers/styles.helper';
import colors from '../../../theme/colors';
import spacing from '../../../theme/spacing';
import IconMaterialOrSvg, {IconType} from '../IconMaterialOrSvg';
import PrimaryButton from '../PrimaryButton';
import {body2, headline3, Text} from '../Text';

export default function ConfirmDialog({
  onCancelClick,
  onConfirmClick,
  confirmText,
  cancelText,
  imageSVG,
  colorsCancel,
  colorsConfirm,
  colorTitle,
  sizeImage,
  title,
  subTitle,
  visible,
}) {
  return (
    <Modal
      onBackButtonPress={onCancelClick}
      statusBarTranslucent={true}
      useNativeDriver={true}
      isVisible={visible}>
      <View style={styles.container}>
        {imageSVG && (
          <IconMaterialOrSvg
            type={IconType.Svg}
            size={sizeImage}
            SVGIcon={imageSVG}
            style={styles.redColor}
          />
        )}
        <Text type={headline3} style={{color: colorTitle}}>
          {title}
        </Text>
        {subTitle && (
          <Text type={body2} style={styles.subTitle}>
            {subTitle}
          </Text>
        )}
        <View style={styles.warpperButton}>
          <PrimaryButton
            style={[
              styles.flex49,
              styles.mrRight,
              {backgroundColor: colorsCancel},
            ]}
            title={cancelText}
            onPress={onCancelClick}
          />
          <PrimaryButton
            onPress={onConfirmClick}
            style={[
              styles.flex49,
              styles.mrLeft,
              {backgroundColor: colorsConfirm},
            ]}
            title={confirmText}
          />
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  flex49: {flex: 1},
  mrRight: {marginRight: spacing.tiny},
  mrLeft: {marginLeft: spacing.tiny},
  warpperButton: {
    ...Styles.rowBetween,
    marginTop: spacing.extraLarge,
  },
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.medium,
    paddingTop: spacing.medium,
    paddingBottom: spacing.large,
    borderRadius: scale(5),
    ...Styles.columnCenter,
    width: '100%',
  },
  subTitle: {
    marginTop: spacing.small,
    textAlign: 'center',
  },
});
