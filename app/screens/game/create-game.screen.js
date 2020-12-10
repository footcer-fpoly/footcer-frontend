import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  LayoutAnimation,
  UIManager,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';
import {headline4, headline5, Text} from '../../components/common/Text';
import ToolBar from '../../components/common/Toolbar';
import {scale} from '../../helpers/size.helper';
import rootNavigator from '../../navigations/root.navigator';
import {HOME_SCREEN} from '../../navigations/route-name';
import colors from '../../theme/colors';
import Icon from 'react-native-vector-icons/Octicons';
import RowProflie from '../../components/account/RowProflie';
import {IconType} from '../../components/common/IconMaterialOrSvg';
import ModalPickerTeams from '../../components/game/ModalPickerTeams';
import {Host} from 'react-native-portalize';
import ModalPickerOrder from '../../components/game/ModalPickerOrder';
import PrimaryButton from '../../components/common/PrimaryButton';
import Styles from '../../helpers/styles.helper';
import {
  converSecondsToTime,
  formatDateTime,
  formatToDate,
} from '../../helpers/format.helper';
import TitleTextInputField from '../../components/common/TitleTextInputField';
import CardMyTeam from '../../components/account/CardMyTeam';
import TextError from '../../components/common/TextError';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import {createGameService} from '../../api/game.api';
import {StatusCode} from '../../api/status-code';
import {ToastHelper} from '../../helpers/ToastHelper';
import {connect} from 'react-redux';
import {showLoading, hideLoading} from '../../redux/actions/loading.action';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const CreateGameScreen = ({showLoading, hideLoading}) => {
  const modalizeTeamsRef = useRef();
  const modalizeOrderRef = useRef();
  const [dataTeam, setDataTeam] = useState(null);
  const [dataOrder, setDataOrder] = useState(null);
  const [description, setDescription] = useState('');
  const handleOnPress = () => {
    rootNavigator.back();
  };
  const [error, setError] = useState({
    team: false,
    order: false,
  });
  const navigateToScreen = () => {
    rootNavigator.navigate(HOME_SCREEN);
  };
  const showDialogTeams = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    clearError();
    setDataTeam(null);
    if (modalizeTeamsRef.current) {
      modalizeTeamsRef.current.openModal();
    }
  };
  const showDialogOrder = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    clearError();
    setDataOrder(null);
    if (modalizeOrderRef.current) {
      modalizeOrderRef.current.openModal();
    }
  };

  const onSelectItemTeam = itemData => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setDataTeam(itemData.item);
  };
  const onSelectItemOrder = itemData => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setDataOrder(itemData.item);
  };
  const clearError = () => {
    setError({
      team: false,
      order: false,
    });
  };
  const createGame = async () => {
    try {
      if (!dataTeam) {
        setError({...error, team: true});
      } else if (!dataOrder) {
        setError({...error, order: true});
      } else {
        showLoading();
        const res = await createGameService({
          date: formatToDate(dataOrder.time),
          hour: `${converSecondsToTime(
            dataOrder?.stadium_details?.startTimeDetail,
          )} - ${converSecondsToTime(
            dataOrder?.stadium_details?.endTimeDetail,
          )}`,
          type: `${dataOrder?.stadium_collage?.amountPeople} vs ${
            dataOrder?.stadium_collage?.amountPeople
          }`,
          description,
          stadiumId: dataOrder.stadium.stadiumId,
          teamIdHost: dataTeam.teamId,
        });
        if (res && res.code === StatusCode.SUCCESS) {
          ToastHelper.showToast('Tạo trận đấu thành công');
          rootNavigator.back();
        } else {
          hideLoading();
          ToastHelper.showToast('Lỗi hệ thống');
        }
        hideLoading();
      }
    } catch (error) {
      console.log('createGameService -->error: ', error);
      hideLoading();
    }
  };
  const renderToolBar = () => {
    return (
      <ToolBar
        style={styles.toolBar}
        left={
          <TouchableOpacity style={styles.btnBack} onPress={handleOnPress}>
            <Icon name="chevron-left" size={scale(25)} color={colors.white} />
          </TouchableOpacity>
        }
        center={
          <Text type={headline5} style={styles.titleToolBar}>
            Tạo trận đấu
          </Text>
        }
        right={
          <TouchableOpacity style={styles.btnBack} onPress={navigateToScreen}>
            <Icon name="home" size={scale(25)} color={colors.white} />
          </TouchableOpacity>
        }
      />
    );
  };
  return (
    <Host>
      <View style={styles.container}>
        {renderToolBar()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}>
          <View style={styles.sectionTeam}>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor={colors.red}
              style={[styles.btn, {backgroundColor: colors.errorBackground}]}
              onPress={showDialogTeams}>
              <Text style={{color: colors.white}} type={headline4}>
                {dataTeam ? 'Đội bóng' : 'Chọn đội bóng'}
              </Text>
            </TouchableHighlight>
            {error?.team && (
              <TextError style={styles.txtErr} text="Hãy chọn đội bóng" />
            )}
            {dataTeam && (
              <>
                <CardMyTeam width={'100%'} item={dataTeam} />
              </>
            )}
          </View>
          <View style={[styles.sectionTeam, styles.mrTop]}>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor={colors.greenDark}
              style={[styles.btn, {backgroundColor: colors.greenLight}]}
              onPress={showDialogOrder}>
              <Text style={{color: colors.white}} type={headline4}>
                {dataOrder ? dataOrder?.stadium?.stadiumName : 'Chọn sân bóng'}
              </Text>
            </TouchableHighlight>
            {error?.order && (
              <TextError style={styles.txtErr} text="Hãy chọn sân bóng" />
            )}
            {dataOrder && (
              <>
                <RowProflie
                  label="Sân con"
                  value={dataOrder?.stadium_collage?.stadiumCollageName}
                  iconType={IconType.MaterialIcons}
                  iconName="sports-soccer"
                  editable={false}
                />
                <RowProflie
                  label="Ngày đấu"
                  value={formatDateTime(dataOrder?.time)}
                  iconType={IconType.MaterialIcons}
                  iconName="date-range"
                  editable={false}
                />
                <RowProflie
                  label="Thời gian"
                  value={`${converSecondsToTime(
                    dataOrder?.stadium_details?.startTimeDetail,
                  )} - ${converSecondsToTime(
                    dataOrder?.stadium_details?.endTimeDetail,
                  )}`}
                  iconType={IconType.MaterialIcons}
                  iconName="update"
                  editable={false}
                />
                <RowProflie
                  label="Kiểu thi đấu"
                  value={`${dataOrder?.stadium_collage?.amountPeople} vs ${
                    dataOrder?.stadium_collage?.amountPeople
                  }`}
                  iconType={IconType.MaterialIcons}
                  iconName="6-ft-apart"
                  editable={false}
                />
                <RowProflie
                  label="Địa điểm"
                  value={dataOrder?.stadium?.address}
                  iconType={IconType.MaterialIcons}
                  iconName="location-pin"
                  editable={false}
                  otherTextInputProps={{
                    multiline: true,
                  }}
                />
              </>
            )}
          </View>
          <View style={[styles.sectionTeam, styles.mrTop]}>
            <TitleTextInputField
              style={{marginTop: scale(-50), backgroundColor: colors.white}}
              lable="Lời nhắn đến đối thủ"
              onChangeText={text => setDescription(text)}
              otherTextInputProps={{
                multiline: true,
                placeholder: 'Nhập lời nhắn đến đối thủ',
              }}
            />
          </View>
        </ScrollView>

        <View style={styles.wrapperBtnOrder}>
          <PrimaryButton onPress={createGame} title="Tạo trận đấu" />
        </View>
        <ModalPickerTeams
          ref={modalizeTeamsRef}
          onSelectItem={onSelectItemTeam}
        />
        <ModalPickerOrder
          ref={modalizeOrderRef}
          onSelectItem={onSelectItemOrder}
        />
      </View>
    </Host>
  );
};
const styles = StyleSheet.create({
  mrTop: {
    marginTop: scale(60),
  },
  txtErr: {
    marginTop: scale(5),
  },
  toolBar: {
    backgroundColor: colors.main,
  },
  titleToolBar: {
    color: colors.white,
    textTransform: 'uppercase',
  },
  btnBack: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(15),
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContainer: {
    paddingTop: scale(50),
    paddingBottom: scale(100),
  },
  sectionTeam: {
    backgroundColor: 'white',
    padding: scale(10),
    ...Styles.borderView(colors.greenDark, scale(1), scale(5)),
    marginHorizontal: scale(10),
  },
  btn: {
    ...Styles.borderView(colors.gray, scale(1), scale(5)),
    ...Styles.columnCenter,
    paddingVertical: scale(10),
    marginTop: scale(-35),
    backgroundColor: colors.white,
  },
  wrapperBtnOrder: {
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    paddingHorizontal: scale(10),
    paddingTop: scale(10),
    paddingBottom: scale(5),
    borderTopRightRadius: scale(10),
    borderTopLeftRadius: scale(10),
  },
});

const mapDispatchToProps = {
  showLoading,
  hideLoading,
};

export default connect(
  null,
  mapDispatchToProps,
)(CreateGameScreen);
