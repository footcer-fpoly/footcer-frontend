import React from 'react';
import {useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import useText from '../../hooks/useText';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import RowProflie from '../account/RowProflie';
import Avatar from '../common/Avatar';
import {IconType} from '../common/IconMaterialOrSvg';
import PrimaryButton from '../common/PrimaryButton';
import {body1, body3, headline4, Text} from '../common/Text';

const ModalShowInfoMember = ({
  visible,
  dismiss,
  data,
  isLeader,
  index,
  deleteMember,
}) => {
  const t = useText();
  const [onReady, setOnReady] = useState(true);
  const remove = () => {
    if (deleteMember) {
      setOnReady(false);
      deleteMember();
      setTimeout(function() {
        setOnReady(true);
      }, 1000);
    }
  };
  const renderButtonDelete = () => {
    if (isLeader && index) {
      return (
        <PrimaryButton
          style={styles.btn}
          title="Loại khỏi đội"
          textStyle={styles.txtBtn}
          onPress={remove}
          right={
            !onReady && <ActivityIndicator size="small" color={colors.white} />
          }
        />
      );
    }
    return <View />;
  };
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
              image={data?.user?.avatar}
            />
            <View style={styles.warpperName}>
              <Text type={headline4}>{data?.user?.displayName}</Text>
              <View style={[styles.flexRow, styles.mrTopTiny]}>
                <Icon name={'phone'} size={22} color={colors.gray} />
                <Text type={body3} style={styles.txtPhone}>
                  {data?.user?.phone}
                </Text>
              </View>
            </View>
          </View>
          <RowProflie
            label="Trạng thái"
            value={
              data?.role == 1
                ? t.leader
                : data?.accept == 1
                ? t.member
                : t.wait_confirm
            }
            iconType={IconType.MaterialCommunityIcons}
            iconName="bell"
            editable={false}
            stylesTxt={
              data?.role == 1
                ? {color: colors.yellowDark}
                : data?.accept == 1
                ? {color: colors.greenDark}
                : {color: colors.orange}
            }
          />
          <RowProflie
            label="Ngày sinh"
            value={
              data?.user?.birthday
                ? data?.user?.birthday
                : 'Chưa cập nhật ngày sinh'
            }
            iconType={IconType.MaterialCommunityIcons}
            iconName="calendar-month-outline"
            editable={false}
          />
          <RowProflie
            label="Ví trí"
            value={
              data?.user?.position
                ? data?.user?.position
                : 'Chưa cập nhật vị trí'
            }
            iconType={IconType.MaterialCommunityIcons}
            iconName="checkerboard"
            editable={false}
          />
          <RowProflie
            label="Trình độ"
            value={
              data?.user?.level ? data?.user?.level : 'Chưa cập nhật trình độ'
            }
            iconType={IconType.MaterialCommunityIcons}
            iconName="chess-queen"
            editable={false}
          />
          {renderButtonDelete()}
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
    paddingHorizontal: scale(15),
  },
  txtBtn: {
    fontWeight: 'normal',
    textTransform: 'uppercase',
  },
});
