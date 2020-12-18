import React, {useRef, useState} from 'react';
import {
  ImageBackground,
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Host} from 'react-native-portalize';
import Icon from 'react-native-vector-icons/Octicons';
import {connect} from 'react-redux';
import {createGameService} from '../../api/game.api';
import {StatusCode} from '../../api/status-code';
import {bgStadiumImage} from '../../assets/Images';
import CardMyTeam from '../../components/team/CardMyTeam';
import RowProflie from '../../components/account/RowProflie';
import {IconType} from '../../components/common/IconMaterialOrSvg';
import PrimaryButton from '../../components/common/PrimaryButton';
import {headline4, headline5, Text} from '../../components/common/Text';
import TextError from '../../components/common/TextError';
import ToolBar from '../../components/common/Toolbar';
import ModalPickerOrder from '../../components/game/ModalPickerOrder';
import ModalPickerTeams from '../../components/game/ModalPickerTeams';
import {
  converSecondsToTime,
  formatDateTime,
  formatToDate,
} from '../../helpers/format.helper';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import {ToastHelper} from '../../helpers/ToastHelper';
import rootNavigator from '../../navigations/root.navigator';
import {HOME_SCREEN} from '../../navigations/route-name';
import {hideLoading, showLoading} from '../../redux/actions/loading.action';
import colors from '../../theme/colors';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const CreateGameScreen = ({showLoading, hideLoading, listGameUser}) => {
  const modalizeTeamsRef = useRef();
  const modalizeOrderRef = useRef();
  const scrollRef = useRef();

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

  const onSelectItemTeam = (itemData) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setDataTeam(itemData.item);
  };
  const onSelectItemOrder = (itemData) => {
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
          type: `${dataOrder?.stadium_collage?.amountPeople} vs ${dataOrder?.stadium_collage?.amountPeople}`,
          description,
          stadiumId: dataOrder.stadium.stadiumId,
          teamIdHost: dataTeam.teamId,
          orderId: dataOrder.orderId,
        });
        console.log('createGameService -->res: ', res);
        if (res && res.code === StatusCode.SUCCESS) {
          ToastHelper.showToast('Tạo trận đấu thành công');
          rootNavigator.back();
        } else {
          hideLoading();
          ToastHelper.showToast('Lỗi hệ thống', colors.red);
        }
        hideLoading();
      }
    } catch (error) {
      ToastHelper.showToast('Lỗi hệ thống', colors.red);
      console.log('createGameService -->error: ', error);
      hideLoading();
    }
  };
  const renderToolBar = () => {
    return (
      <ToolBar
        backgroundColor={colors.main}
        left={true}
        title="Tạo trận đấu"
        right={
          <TouchableOpacity onPress={navigateToScreen}>
            <Icon name="home" size={scale(25)} color={colors.white} />
          </TouchableOpacity>
        }
      />
    );
  };
  return (
    <Host>
      <ImageBackground source={bgStadiumImage} style={styles.container}>
        <LinearGradient colors={colors.blackGradient} style={styles.center}>
          {renderToolBar()}
          <ScrollView
            ref={scrollRef}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}>
            <View style={styles.sectionTeam}>
              <TouchableOpacity style={styles.btn} onPress={showDialogTeams}>
                <Text style={{color: colors.white}} type={headline4}>
                  {dataTeam ? 'Đội bóng' : 'Chọn đội bóng'}
                </Text>
              </TouchableOpacity>
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
              <TouchableOpacity style={styles.btn} onPress={showDialogOrder}>
                <Text style={{color: colors.white}} type={headline4}>
                  {dataOrder
                    ? dataOrder?.stadium?.stadiumName
                    : 'Chọn sân bóng'}
                </Text>
              </TouchableOpacity>
              {error?.order && (
                <TextError style={styles.txtErr} text="Hãy chọn sân bóng" />
              )}
              {dataOrder && (
                <View
                  style={{
                    backgroundColor: colors.white,
                    paddingHorizontal: scale(10),
                    marginTop: scale(5),
                    borderRadius: scale(3),
                    paddingTop: scale(5),
                    paddingBottom: scale(20),
                  }}>
                  <RowProflie
                    label="Sân con"
                    value={dataOrder?.stadium_collage?.stadiumCollageName}
                    iconType={IconType.MaterialCommunityIcons}
                    iconName="camera-metering-partial"
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
                    value={`${dataOrder?.stadium_collage?.amountPeople} vs ${dataOrder?.stadium_collage?.amountPeople}`}
                    iconType={IconType.MaterialCommunityIcons}
                    iconName="format-list-bulleted-type"
                    editable={false}
                  />
                  <RowProflie
                    label="Địa điểm"
                    value={dataOrder?.stadium?.address}
                    iconType={IconType.MaterialIcons}
                    iconName="location-on"
                    editable={false}
                    otherTextInputProps={{
                      multiline: true,
                    }}
                  />
                </View>
              )}
            </View>
            <View style={styles.wrapperDescription}>
              <Text type={headline5} style={styles.txtTitleDes}>
                Lời nhắn đến đối thủ
              </Text>
              <View style={styles.wrapperInput}>
                <TextInput
                  multiline={true}
                  onChangeText={(text) => setDescription(text)}
                  placeholderTextColor={colors.gray}
                  placeholder="Nhập lời nhắn đến đối thủ"
                  style={styles.textInput}
                  maxLength={300}
                />
                <Text style={styles.txtCountDes}>{description.length}/300</Text>
              </View>
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
        </LinearGradient>
      </ImageBackground>
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
  container: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollContainer: {
    paddingTop: scale(50),
    paddingBottom: scale(100),
  },
  sectionTeam: {
    marginHorizontal: scale(10),
  },
  btn: {
    ...Styles.borderView(colors.white, scale(0.5), scale(5)),
    ...Styles.columnCenter,
    paddingVertical: scale(20),
    marginTop: scale(-35),
  },
  wrapperBtnOrder: {
    backgroundColor: colors.white + 'B3',
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
  center: {...Styles.flex1},
  wrapperDescription: {
    paddingHorizontal: scale(10),
    marginTop: scale(30),
  },
  txtTitleDes: {
    color: colors.white,
    marginLeft: scale(10),
  },
  wrapperInput: {
    ...Styles.borderView(colors.white, 0.5, 5),
    paddingHorizontal: scale(10),
    height: scale(140),
    paddingBottom: scale(20),
    paddingTop: scale(5),
  },
  textInput: {
    color: colors.white,
    textAlign: 'justify',
  },
  txtCountDes: {
    color: colors.white,
    textAlign: 'right',
    position: 'absolute',
    bottom: scale(5),
    right: scale(10),
  },
});

const mapDispatchToProps = {
  showLoading,
  hideLoading,
};
function mapStateToProps(state) {
  return {
    listGameUser: state.authState.listGame,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGameScreen);
