import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import ScrollableTabView, {
  DefaultTabBar,
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getGameService} from '../../api/game.api';
import {StatusCode} from '../../api/status-code';
import ListLoadingComponent from '../../components/common/ListLoadingComponent';
import {body3, headline5, Text} from '../../components/common/Text';
import ToolBar from '../../components/common/Toolbar';
import ButonModalDate from '../../components/CreateMatchScreenComponents/ButonModalDate';
import CardGame from '../../components/game/CardGame';
import FloatingActionButton from '../../components/game/FLoatingActionButton';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import colors from '../../theme/colors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {formatToDate} from '../../helpers/format.helper';
import {ToastHelper} from '../../helpers/ToastHelper';

const ListGameScreen = () => {
  const [listGame, setListGame] = useState({
    data: [],
    onReady: false,
    date: '',
    visbaleModal: false,
  });
  useEffect(() => {
    getData('all');
  }, []);
  const getData = async params => {
    try {
      const res = await getGameService(params);
      if (res && res.code === StatusCode.SUCCESS) {
        setListGame({
          ...listGame,
          data: res.data,
          onReady: true,
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
  const handleConfirmDatePicker = date => {
    console.log('------');
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
  return (
    <View style={styles.container}>
      <ToolBar
        style={{backgroundColor: colors.main}}
        center={
          <Text type={headline5} style={styles.titleToolbar}>
            Danh sách trận đấu
          </Text>
        }
      />
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
        <View style={styles.warpperContent} tabLabel="Trận đấu">
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
        <View
          style={[styles.warpperContent, styles.mrTop]}
          tabLabel="Trận đấu của bạn">
          <FlatList
            data={listGame.data}
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
      </ScrollableTabView>
      <FloatingActionButton />
    </View>
  );
};
export default ListGameScreen;
const styles = StyleSheet.create({
  mrTop: {
    marginTop: scale(10),
  },
  titleToolbar: {
    color: colors.white,
    textTransform: 'uppercase',
  },
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
  warpperFilter: {
    ...Styles.rowBetween,
  },
  warpperContent: {
    // marginTop: scale(10),
  },
  list: {
    paddingBottom: scale(150),
  },
});
