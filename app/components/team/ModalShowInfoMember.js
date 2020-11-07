import React from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import RowProflie from '../account/RowProflie';
import Avatar from '../common/Avatar';
import {IconType} from '../common/IconMaterialOrSvg';
import PrimaryButton from '../common/PrimaryButton';
import {body1, body3, headline4, Text} from '../common/Text';

const ModalShowInfoMember = ({visible, dismiss, data}) => {
  console.log('data: ', data);
  return (
    <Modal
      onBackButtonPress={dismiss}
      onBackdropPress={dismiss}
      statusBarTranslucent={true}
      useNativeDriver={true}
      isVisible={visible}>
      <View style={styles.container}>
        <Text type={body1} style={styles.txtTitle}>
          Chi tiết cầu thủ
        </Text>
        <View style={styles.content}>
          <View style={styles.flexRow}>
            <Avatar
              size={scale(70)}
              borderWidth={2}
              borderColor={colors.black}
            />
            <View style={styles.warpperName}>
              <Text type={headline4}>Duong Quoc Hai</Text>
              <View style={[styles.flexRow, styles.mrTopTiny]}>
                <Icon name={'phone'} size={22} />
                <Text type={body3} style={styles.txtPhone}>
                  0903585173
                </Text>
              </View>
            </View>
          </View>
          <RowProflie
            label="Trạng thái"
            value={'Chờ xác nhận'}
            iconType={IconType.MaterialCommunityIcons}
            iconName="bell"
            editable={false}
          />
          <RowProflie
            label="Ngày sinh"
            value={'Ngày sinh'}
            iconType={IconType.MaterialCommunityIcons}
            iconName="calendar-month-outline"
            editable={false}
          />
          <RowProflie
            label="Ví trí"
            value={'Chọn vị trí'}
            iconType={IconType.MaterialCommunityIcons}
            iconName="checkerboard"
            editable={false}
          />
          <RowProflie
            label="Trình độ"
            value={'Chọn trình độ của bạn'}
            iconType={IconType.MaterialCommunityIcons}
            iconName="chess-queen"
            editable={false}
          />
          <PrimaryButton
            style={styles.btn}
            title="Loại khỏi đội"
            textStyle={styles.txtBtn}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ModalShowInfoMember;

const styles = StyleSheet.create({
  flexRow: {
    ...Styles.rowAlignCenter,
  },
  mrTopTiny: {
    marginTop: spacing.tiny,
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: scale(5),
    paddingHorizontal: scale(10),
    paddingTop: scale(40),
    paddingBottom: scale(10),
  },
  txtTitle: {
    textTransform: 'uppercase',
    backgroundColor: colors.greenDark,
    color: colors.white,
    borderRadius: scale(20),
    paddingHorizontal: scale(40),
    paddingVertical: scale(10),
    position: 'absolute',
    top: scale(-23),
    right: scale(40),
    left: scale(40),
    textAlign: 'center',
  },
  warpperName: {
    marginLeft: spacing.medium,
  },
  txtPhone: {
    marginLeft: spacing.tiny,
  },
  btn: {
    backgroundColor: colors.red,
    marginTop: spacing.extraLarge,
  },
  txtBtn: {
    fontWeight: 'normal',
    textTransform: 'uppercase',
  },
});
