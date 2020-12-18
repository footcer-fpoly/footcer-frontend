import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import icSeenAll from '../../assets/svg/ic_seen.svg';
import IconMaterialOrSvg, {
  IconType,
} from '../../components/common/IconMaterialOrSvg';
import ListLoadingComponent from '../../components/common/ListLoadingComponent';
import {Text} from '../../components/common/Text';
import ToolBar from '../../components/common/Toolbar';
import CardNoti from '../../components/notifi/CardNoti';
import {scale} from '../../helpers/size.helper';
import {getListNoti} from '../../redux/actions/auth.action';

const NotificationScreen = ({getListNoti, listNoti}) => {
  const [state, setState] = useState({});
  useEffect(() => {
    getListNoti();
  }, []);
  const keyExtractor = (item, index) => index.toString();
  const renderItem = ({item, index}) => {
    return <CardNoti item={item} />;
  };
  return (
    <View style={styles.container}>
      <ToolBar
        left={true}
        title="Thông báo"
        right={
          <TouchableOpacity>
            <IconMaterialOrSvg
              type={IconType.Svg}
              size={scale(25)}
              SVGIcon={icSeenAll}
            />
          </TouchableOpacity>
        }
      />
      <FlatList
        data={listNoti}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={
          <ListLoadingComponent
            onReady={true}
            numberOfPlaceholder={3}
            text={'Không có thông báo'}
          />
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingHorizontal: scale(10),
    paddingVertical: scale(10),
  },
});

const mapDispatchToProps = {
  getListNoti,
};
function mapStateToProps(state) {
  return {
    listNoti: state.authState.listNoti,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);
