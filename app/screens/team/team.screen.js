import {useFocusEffect} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {RefreshControl} from 'react-native';
import {FlatList, StyleSheet, View} from 'react-native';
import ScrollableTabView, {
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import {connect} from 'react-redux';
import {StatusCode} from '../../api/status-code';
import {getListTeamService} from '../../api/team.api';
import ListLoadingComponent from '../../components/common/ListLoadingComponent';
import ToolBar from '../../components/common/Toolbar';
import CardMyTeam from '../../components/team/CardMyTeam';
import FloatingActionButton from '../../components/team/FLoatingActionCreateTeam';
import {scale} from '../../helpers/size.helper';
import {getListTeam} from '../../redux/actions/teams.action';
import colors from '../../theme/colors';

export const TeamScreen = ({getListTeam, listTeam}) => {
  const scrollableRef = useRef();
  const [state, setState] = useState({
    listTeamConfirm: [],
    onReady: false,
    isRefreshing: false,
  });

  useFocusEffect(
    React.useCallback(() => {
      fechData();
      if (scrollableRef && scrollableRef?.current?.state?.currentPage) {
        scrollableRef?.current?.goToPage(0);
      }
    }, []),
  );

  const fechData = async () => {
    await Promise.all([getListTeam(), getListTeamConfirm()]);
  };

  const onRefresh = () => {
    setState({...state, isRefreshing: true});
    fechData();
  };

  const getListTeamConfirm = async () => {
    try {
      const res = await getListTeamService();
      console.log(
        'LOG -> file: team.screen.js -> line 32 -> getListTeamConfirm -> res',
        res,
      );
      if (res && res.code === StatusCode.SUCCESS) {
        setState({
          ...state,
          listTeamConfirm: res?.data,
          onReady: true,
          isRefreshing: false,
        });
      }
    } catch (error) {
      console.log(
        'LOG -> file: team.screen.js -> line 37 -> getListTeamConfirm -> error',
        error,
      );
    }
  };
  const keyExtractor = (item, index) => index.toString();
  const renderItem = ({item}) => {
    return <CardMyTeam width={'100%'} item={item} />;
  };
  const renderItemConfirm = ({item}) => {
    return <CardMyTeam confirm={true} width={'100%'} item={item} />;
  };
  return (
    <View style={styles.container}>
      <ToolBar left={true} title="Quản lý đội bóng" />
      <ScrollableTabView
        ref={scrollableRef}
        tabBarUnderlineStyle={{backgroundColor: colors.green}}
        tabBarActiveTextColor={colors.greenDark}
        tabBarBackgroundColor={colors.white}
        initialPage={0}
        renderTabBar={() => <DefaultTabBar />}>
        <View
          style={styles.warpperContent}
          tabLabel={`Đội bóng của bạn (${listTeam?.length || 0})`}>
          <FlatList
            data={listTeam}
            refreshControl={
              <RefreshControl
                refreshing={state.isRefreshing}
                onRefresh={onRefresh}
              />
            }
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listMember}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            ListEmptyComponent={
              <ListLoadingComponent
                onReady={listTeam !== null}
                text={'Chưa có dữ liệu'}
              />
            }
          />
          <FloatingActionButton />
        </View>
        <View
          style={styles.warpperContent}
          tabLabel={`Chờ xác nhận (${state?.listTeamConfirm?.length || 0})`}>
          <FlatList
            data={state.listTeamConfirm}
            refreshControl={
              <RefreshControl
                refreshing={state.isRefreshing}
                onRefresh={onRefresh}
              />
            }
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listMember}
            keyExtractor={keyExtractor}
            renderItem={renderItemConfirm}
            ListEmptyComponent={
              <ListLoadingComponent
                onReady={listTeam !== null}
                text={'Bạn chưa có đội bóng. Hãy tạo đội bóng'}
              />
            }
          />
        </View>
      </ScrollableTabView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  warpperContent: {
    paddingHorizontal: scale(10),
    marginTop: scale(10),
    flex: 1,
  },
  listMember: {
    paddingBottom: scale(100),
  },
});

const mapDispatchToProps = {
  getListTeam,
};
function mapStateToProps(state) {
  return {
    listTeam: state.teamsState.listTeam,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamScreen);
