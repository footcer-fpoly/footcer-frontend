import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import ScrollableTabView, {
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import {connect} from 'react-redux';
import CardMyTeam from '../../components/account/CardMyTeam';
import ListLoadingComponent from '../../components/common/ListLoadingComponent';
import {body3, Text} from '../../components/common/Text';
import ToolBar from '../../components/common/Toolbar';
import {scale} from '../../helpers/size.helper';
import colors from '../../theme/colors';

export const TeamScreen = ({listTeam}) => {
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
        renderTabBar={() => <DefaultTabBar />}>
        <View style={styles.warpperContent} tabLabel="Tất cả trận đấu">
          <FlatList
            data={listTeam}
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={styles.listMember}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            ListEmptyComponent={
              <ListLoadingComponent
                onReady={listTeam !== null}
                numberOfPlaceholder={1}
                text={
                  'Bạn chưa tham gia đội bóng nào click vào tạo đội bóng để tạo đội ngay!'
                }
              />
            }
          />
        </View>
        <Text tabLabel="Tab #2">favorite</Text>
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
  },
  listMember: {
    flex: 1,
  },
});

const mapDispatchToProps = {};
function mapStateToProps(state) {
  return {
    listTeam: state.teamsState.listTeam,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeamScreen);
