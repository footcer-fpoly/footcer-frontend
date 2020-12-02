import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import ToolBar from '../../components/common/Toolbar';
import Icon from 'react-native-vector-icons/Octicons';
import rootNavigator from '../../navigations/root.navigator';
import {headline5, Text} from '../../components/common/Text';
import colors from '../../theme/colors';
import {scale} from '../../helpers/size.helper';
import {getListOrderService} from '../../api/order.api';
import {StatusCode} from '../../api/status-code';
import ListLoadingComponent from '../../components/common/ListLoadingComponent';
import CardStatusOrder from '../../components/order/CardStatusOrder';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import {listStatusOrder} from '../../helpers/data-local.helper';
import {connect} from 'react-redux';

let initialListOrder = [];
const ListOrderScreen = ({listOrder}) => {
  initialListOrder = [...listOrder];
  const [data, setdata] = useState({
    list: listOrder,
    onReady: false,
  });
  const handleOnPress = () => {
    rootNavigator.back();
  };

  const onChangeTab = ({i}) => {
    let newList = [...initialListOrder];
    if (i) {
      const matchedSatus = newList.filter(item => {
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
            Danh sách lịch đặt sân
          </Text>
        }
      />
    );
  };
  return (
    <View style={styles.container}>
      {renderToolBar()}
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
  btnBack: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(15),
  },
  toolBar: {
    backgroundColor: colors.main,
  },
  titleToolBar: {
    color: colors.white,
    textTransform: 'uppercase',
  },
  warpperBody: {
    flex: 1,
    paddingHorizontal: scale(10),
    marginTop: scale(10),
  },
});

function mapStateToProps(state) {
  return {
    listOrder: state.authState.listOrder,
  };
}

export default connect(
  mapStateToProps,
  null,
)(ListOrderScreen);
