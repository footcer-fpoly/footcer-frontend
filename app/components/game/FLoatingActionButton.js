import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Styles from '../../helpers/styles.helper';
import colors from '../../theme/colors';
import {scale} from '../../helpers/size.helper';
import {connect} from 'react-redux';
import ConfirmDialog from '../common/dialog/ConfirmDialog';
import icAddOther from '../../assets/svg/add_other.svg';
import icAddTeam from '../../assets/svg/add_team.svg';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import rootNavigator from '../../navigations/root.navigator';
import {
  CREATE_TEAM_SCREEN,
  STADIUM_SCREEN,
  CREATE_GAME_SCREEN,
  HOME_SCREEN,
} from '../../navigations/route-name';

const FloatingActionButton = ({listTeam, listOrder}) => {
  const listOrderWaitting = listOrder.filter(
    item => item?.order_status?.status === 'WAITING',
  );
  const listOrderAccept = listOrder.filter(
    item => item?.order_status?.status === 'ACCEPT',
  );
  const [contentModal, setContentModal] = useState({
    visible: false,
    image: null,
    subTitle: null,
    titleConfirm: '',
    statusConfirm: null, //0 => noTem || 1 => noOrder
  });
  const toggleModal = () => {
    setContentModal({
      ...contentModal,
      visible: !contentModal.visible,
    });
  };
  const navigateToScreen = () => {
    toggleModal();
    switch (contentModal.statusConfirm) {
      case 0:
        return rootNavigator.navigate(CREATE_TEAM_SCREEN);
      case 1:
        return rootNavigator.navigate(STADIUM_SCREEN);
    }
  };

  const check = () => {
    if (!listTeam.length) {
      setContentModal({
        ...contentModal,
        image: icAddTeam,
        subTitle:
          'Bạn chưa có đội bóng. Hãy tạo đội bóng để có thể tạo trận đấu',
        titleConfirm: 'Tạo đội bóng',
        statusConfirm: 0,
        visible: true,
      });
      return false;
    } else if (!listOrderWaitting.length && !listOrderAccept.length) {
      setContentModal({
        ...contentModal,
        image: icAddOther,
        subTitle:
          'Bạn chưa lịch đặt sân. Hãy dặt sân bóng để có thể tạo trận đấu',
        titleConfirm: 'Đặt sân',
        statusConfirm: 1,
        visible: true,
      });
      return false;
    }
    return rootNavigator.navigate(CREATE_GAME_SCREEN);
  };

  return (
    <>
      <TouchableOpacity onPress={check} style={styles.container}>
        <Icon name="add" size={scale(20)} color={colors.white} />
      </TouchableOpacity>
      <ConfirmDialog
        visible={contentModal.visible}
        imageSVG={contentModal.image}
        sizeImage={scale(150)}
        confirmText={contentModal.titleConfirm}
        cancelText="Hủy"
        colorsCancel={colors.grayDark}
        colorsConfirm={colors.green}
        title="Thông báo tạo trận đấu"
        subTitle={contentModal.subTitle}
        onCancelClick={toggleModal}
        onConfirmClick={navigateToScreen}
        colorTitle={colors.orange}
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    ...Styles.borderRadiusCircle(50),
    ...Styles.columnCenter,
    position: 'absolute',
    bottom: scale(20),
    right: scale(20),
    backgroundColor: colors.main,
  },
});

function mapStateToProps(state) {
  return {
    listOrder: state.authState.listOrder,
    listTeam: state.teamsState.listTeam,
  };
}

export default connect(
  mapStateToProps,
  null,
)(FloatingActionButton);
