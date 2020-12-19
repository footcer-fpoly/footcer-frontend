import React, {useState} from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Octicons';
import {connect} from 'react-redux';
import ListLoadingComponent from '../../components/common/ListLoadingComponent';
import {headline5, Text} from '../../components/common/Text';
import ToolBar from '../../components/common/Toolbar';
import CardStatusOrder from '../../components/order/CardStatusOrder';
import {listStatusOrder} from '../../helpers/data-local.helper';
import {scale} from '../../helpers/size.helper';
import rootNavigator from '../../navigations/root.navigator';
import colors from '../../theme/colors';
import {getListOrder} from '../../redux/actions/auth.action';
import {useFocusEffect} from '@react-navigation/native';

let initialListOrder = [];
const ListOrderScreen = ({listOrder, getListOrder}) => {
  initialListOrder = [...listOrder];
  const [data, setdata] = useState({
    list: listOrder,
    onReady: false,
    isRefreshing: false,
  });

  useFocusEffect(
    React.useCallback(() => {
      getListOrder();
    }, []),
  );

  const onRefresh = () => {
    setdata({...data, isRefreshing: false});
    getListOrder();
  };

  const onChangeTab = ({i}) => {
    let newList = [...initialListOrder];
    if (i) {
      const matchedSatus = newList.filter((item) => {
        return item?.order_status?.status === listStatusOrder[i].key;
      });
      setdata({...data, list: matchedSatus});
    } else {
      setdata({...data, list: newList, onReady: true});
    }
  };

  const keyExtractor = (item, index) => index.toString();
  const renderItem = ({item}) => {
    return <CardStatusOrder item={item} />;
  };

  return (
    <View style={styles.container}>
      <ToolBar title="Danh sách lịch đặt sân" left={true} />
      <ScrollableTabView
        onChangeTab={onChangeTab}
        tabBarUnderlineStyle={{backgroundColor: colors.green}}
        tabBarActiveTextColor={colors.greenDark}
        tabBarBackgroundColor={colors.white}
        initialPage={0}
        renderTabBar={() => <ScrollableTabBar />}>
        {listStatusOrder.map((item, index) => (
          <View
            key={index.toString()}
            style={styles.warpperBody}
            tabLabel={item.name}>
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={data.isRefreshing}
                  onRefresh={onRefresh}
                />
              }
              data={data.list}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.list}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              ListEmptyComponent={
                <ListLoadingComponent
                  onReady={data.onReady}
                  numberOfPlaceholder={3}
                  text={'Không có dữ liệu'}
                />
              }
            />
          </View>
        ))}
      </ScrollableTabView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundScreen},
  warpperBody: {
    flex: 1,
    paddingHorizontal: scale(10),
    marginTop: scale(10),
  },
});

const mapDispatchToProps = {
  getListOrder,
};

function mapStateToProps(state) {
  return {
    listOrder: state.authState.listOrder,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOrderScreen);
