import React, {useImperativeHandle, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {connect} from 'react-redux';
import {scale, verticalScale} from '../../helpers/size.helper';
import colors from '../../theme/colors';
import {headline3, Text} from '../common/Text';
import CardStatusOrder from '../order/CardStatusOrder';

const ModalPickerOrder = React.forwardRef(({onSelectItem, listOrder}, ref) => {
  const modalizeRef = useRef();
  const newListOrder = listOrder.filter(
    item =>
      item?.order_status?.status === 'WAITING' ||
      item?.order_status?.status === 'ACCEPT',
  );

  const openModal = () => {
    if (modalizeRef.current) {
      modalizeRef.current.open();
    }
  };

  useImperativeHandle(ref, () => ({
    openModal,
  }));
  const onPressItem = item => () => {
    if (onSelectItem) {
      onSelectItem({item});
    }
    if (modalizeRef.current) {
      modalizeRef.current.close();
    }
  };

  const renderItem = ({item, index}) => {
    return <CardStatusOrder onPress={onPressItem(item)} item={item} />;
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerContent}>
        <Text type={headline3} style={{color: colors.grayDark}}>
          Chọn sân bóng
        </Text>
      </View>
    );
  };
  return (
    <Portal>
      <Modalize
        snapPoint={verticalScale(400)}
        modalHeight={verticalScale(700)}
        panGestureComponentEnabled={true}
        avoidKeyboardLikeIOS={false}
        ref={modalizeRef}
        rootStyle={styles.modalRootStyle}
        modalStyle={styles.modalStyle}
        flatListProps={{
          data: newListOrder,
          renderItem: renderItem,
          bounces: false,
          keyExtractor: (item, index) => item.id + index.toString(),
          showsVerticalScrollIndicator: false,
        }}
        HeaderComponent={renderHeader()}
      />
    </Portal>
  );
});

const mapStateToProps = state => ({
  listOrder: state.authState.listOrder,
});

export default connect(
  mapStateToProps,
  null,
  null,
  {
    forwardRef: true,
  },
)(ModalPickerOrder);

const styles = StyleSheet.create({
  headerContent: {
    padding: scale(16),
    alignItems: 'center',
  },
  modalStyle: {
    borderTopLeftRadius: scale(12),
    borderTopRightRadius: scale(12),
    paddingHorizontal: scale(10),
  },
  modalRootStyle: {
    elevation: scale(10),
  },
});
