import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import {connect} from 'react-redux';
import CardMyTeam from '../../components/account/CardMyTeam';
import ListLoadingComponent from '../../components/common/ListLoadingComponent';
import {Text} from '../../components/common/Text';
import ToolBar from '../../components/common/Toolbar';
import {scale} from '../../helpers/size.helper';
import colors from '../../theme/colors';
import {getListTeam} from '../../redux/actions/teams.action';
import {useFocusEffect} from '@react-navigation/native';
import FloatingActionButton from '../../components/team/FLoatingActionCreateTeam';

export const TeamScreen = ({getListTeam, listTeam}) => {
  useFocusEffect(
    React.useCallback(() => {
      getListTeam();
    }, []),
  );
  const keyExtractor = (item, index) => index.toString();
  const renderItem = ({item}) => {
    return <CardMyTeam width={'100%'} item={item} />;
  };
  return (
    <View style={styles.container}>
      <ToolBar left={true} title="Quản lý đội bóng" />
      <ScrollableTabView
        tabBarUnderlineStyle={{backgroundColor: colors.green}}
        tabBarActiveTextColor={colors.greenDark}
        tabBarBackgroundColor={colors.white}
        initialPage={0}
        renderTabBar={() => <ScrollableTabBar />}>
        <View style={styles.warpperContent} tabLabel="Đội bóng của bạn">
          <FlatList
            data={listTeam}
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
        <Text tabLabel="Đội bóng đang chờ xác nhận">favorite</Text>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeamScreen);
