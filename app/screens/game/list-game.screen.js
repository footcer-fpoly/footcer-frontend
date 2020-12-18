import {useFocusEffect} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ScrollableTabView, {
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {getGameService} from '../../api/game.api';
import {StatusCode} from '../../api/status-code';
import DescriptionStatus from '../../components/common/DescriptionStatus';
import ListLoadingComponent from '../../components/common/ListLoadingComponent';
import {body3, headline6, Text} from '../../components/common/Text';
import ToolBar from '../../components/common/Toolbar';
import CardGame from '../../components/game/CardGame';
import CardMyGame from '../../components/game/CardMyGame';
import FloatingActionButton from '../../components/game/FLoatingActionButton';
import {compareDateTime, formatToDate} from '../../helpers/format.helper';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import {ToastHelper} from '../../helpers/ToastHelper';
import {getListGame, getListOrder} from '../../redux/actions/auth.action';
import colors from '../../theme/colors';
const ListGameScreen = ({getListGame, listGameUser, getListOrder}) => {
  const [listGame, setListGame] = useState({
    data: [],
    onReady: false,
    date: '',
    visbaleModal: false,
    isRefreshing: false,
  });
  useFocusEffect(
    React.useCallback(() => {
      fechData();
    }, []),
  );

  const onRefresh = () => {
    setListGame({...listGame, isRefreshing: true});
    fechData();
  };
  const fechData = async () => {
    await Promise.all([getData('all'), getListGame(), getListOrder()]);
  };
  const getData = async (params) => {
    try {
      const res = await getGameService(params);
      if (res && res.code === StatusCode.SUCCESS) {
        setListGame({
          ...listGame,
          data: res.data.filter((item) =>
            compareDateTime(item?.date, new Date()),
          ),
          onReady: true,
          isRefreshing: false,
        });
      } else {
        setListGame({
          ...listGame,
          data: [],
          onReady: true,
        });
        ToastHelper.showToast('Lỗi');
      }
    } catch (error) {
      console.log('getGameService -->error: ', error);
    }
  };
  const refreshData = () => {
    setListGame({
      ...listGame,
      date: '',
      data: [],
      onReady: false,
    });
    getData('all');
  };
  const toogleDatePicker = () => {
    setListGame({
      ...listGame,
      visbaleModal: !listGame.visbaleModal,
    });
  };
  const handleConfirmDatePicker = (date) => {
    getData(formatToDate(date));
    setListGame({
      ...listGame,
      date: formatToDate(date),
      visbaleModal: false,
    });
  };
  const keyExtractor = (item, index) => index.toString();
  const renderItem = ({item, index}) => {
    return <CardGame item={item} />;
  };
  const renderItemMyGame = ({item, index}) => {
    return <CardMyGame item={item} />;
  };
  return (
    <View style={styles.container}>
      <ToolBar left={true} title="Trận đấu" backgroundColor={colors.main} />
      <DateTimePickerModal
        isVisible={listGame.visbaleModal}
        mode="date"
        onConfirm={handleConfirmDatePicker}
        onCancel={toogleDatePicker}
      />
      <ScrollableTabView
        tabBarUnderlineStyle={{backgroundColor: colors.green}}
        tabBarActiveTextColor={colors.greenDark}
        tabBarBackgroundColor={colors.white}
        initialPage={0}
        renderTabBar={() => <DefaultTabBar />}>
        <View style={styles.warpperContent} tabLabel="Tất cả trận đấu">
          <View style={styles.warpperHeader}>
            <Text type={body3}>{listGame.data.length} trận</Text>
            <TouchableOpacity onPress={refreshData}>
              <Icon name="refresh" size={scale(25)} color={colors.greenDark} />
            </TouchableOpacity>
            <View style={styles.warpperFilter}>
              <Text type={body3}>Lọc theo ngày: </Text>
              <TouchableOpacity onPress={toogleDatePicker}>
                <Icon
                  name="date-range"
                  size={scale(25)}
                  color={colors.greenDark}
                />
              </TouchableOpacity>
              <Text> {listGame.date}</Text>
            </View>
          </View>
          <FlatList
            data={listGame.data}
            refreshControl={
              <RefreshControl
                refreshing={listGame.isRefreshing}
                onRefresh={onRefresh}
              />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            ListEmptyComponent={
              <ListLoadingComponent
                onReady={listGame.onReady}
                numberOfPlaceholder={3}
                text={'Không có dữ liệu'}
              />
            }
          />
        </View>
        <View style={styles.warpperContent} tabLabel="Trận đấu của bạn">
          <View style={styles.warpperHeader}>
            <View style={styles.warpperCountList}>
              <Text type={headline6}>{listGameUser.length} trận</Text>
            </View>
            <DescriptionStatus
              color={colors.greenDark}
              lable="Trận đấu sắp tới"
            />
            <DescriptionStatus
              color={colors.grayDark}
              lable="Trận đấu đã qua"
            />
          </View>
          <FlatList
            data={listGameUser}
            refreshControl={
              <RefreshControl
                refreshing={listGame.isRefreshing}
                onRefresh={onRefresh}
              />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            keyExtractor={keyExtractor}
            renderItem={renderItemMyGame}
            ListEmptyComponent={
              <ListLoadingComponent
                onReady={listGame.onReady}
                numberOfPlaceholder={3}
                text={'Không có dữ liệu'}
              />
            }
          />
        </View>
      </ScrollableTabView>
      <FloatingActionButton />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  warpperHeader: {
    ...Styles.rowBetween,
    backgroundColor: colors.white,
    paddingHorizontal: scale(10),
    paddingVertical: scale(15),
    marginBottom: scale(10),
    borderBottomWidth: scale(0.5),
    borderBottomColor: colors.gray,
  },
  warpperCountList: {
    flex: 0,
    marginRight: scale(10),
    paddingRight: scale(10),
    borderRightWidth: 1,
    borderRightColor: colors.gray,
  },
  warpperFilter: {
    ...Styles.rowBetween,
  },
  warpperContent: {
    flex: 1,
  },
  list: {
    paddingBottom: scale(70),
  },
});

const mapDispatchToProps = {
  getListGame,
  getListOrder,
};
function mapStateToProps(state) {
  return {
    listGameUser: state.authState.listGame,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListGameScreen);
