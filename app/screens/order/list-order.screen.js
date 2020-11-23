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

export default function ListOrderScreen() {
  const [data, setdata] = useState(null);
  const handleOnPress = () => {
    rootNavigator.back();
  };
  useEffect(() => {
    getData();
  });
  const getData = async () => {
    const res = await getListOrderService();
    if (res && res.code === StatusCode.SUCCESS) {
      setdata(res.data);
    } else {
      alert('nhu cc');
    }
  };
  const keyExtractor = (item, index) => index.toString();
  const renderItem = ({item}) => {
    return <CardStatusOrder data={item} />;
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
    <View>
      {renderToolBar()}
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={
          <ListLoadingComponent
            onReady={data !== null}
            numberOfPlaceholder={3}
            text={
              'Bạn chưa tham gia đội bóng nào click vào tạo đội bóng để tạo đội ngay!'
            }
          />
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
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
});
