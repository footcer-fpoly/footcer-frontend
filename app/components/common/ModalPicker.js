import React, {useImperativeHandle, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {scale, verticalScale} from '../../helpers/size.helper';
import colors from '../../theme/colors';
import {body2, headline3, Text} from './Text';

const ModalPicker = React.forwardRef(({onSelectItem}, ref) => {
  const [data, setData] = useState({
    type: null,
    title: '',
    listItems: [],
  });

  const modalizeRef = useRef();

  const onPressItem = item => () => {
    console.log('onPressItem -> item', item);
    if (onSelectItem) {
      onSelectItem({type: data.type, item});
    }
    if (modalizeRef.current) {
      modalizeRef.current.close();
    }
  };

  const setDataAndOpenModal = data => {
    setData(data);
    if (modalizeRef.current) {
      modalizeRef.current.open();
    }
  };

  useImperativeHandle(ref, () => ({
    setDataAndOpenModal,
  }));

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={onPressItem(item)}
        style={styles.itemContainer}>
        <Text type={body2}>{item.name ?? ''}</Text>
        <Icon />
      </TouchableOpacity>
    );
  };
  const onModalClosed = () => {
    setData({
      title: '',
      listItems: [],
    });
  };
  const renderHeader = () => {
    return (
      <View style={styles.headerContent}>
        <Text type={headline3} style={{color: colors.grayDark}}>
          {data.title}
        </Text>
      </View>
    );
  };
  return (
    <Portal>
      <Modalize
        onOpened={() => {}}
        onClosed={onModalClosed}
        snapPoint={verticalScale(400)}
        modalHeight={verticalScale(700)}
        panGestureComponentEnabled={true}
        avoidKeyboardLikeIOS={false}
        ref={modalizeRef}
        rootStyle={styles.modalRootStyle}
        modalStyle={styles.modalStyle}
        flatListProps={{
          data: data.listItems,
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

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  null,
  null,
  {
    forwardRef: true,
  },
)(ModalPicker);

const styles = StyleSheet.create({
  itemContainer: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: colors.grayLight,
    paddingHorizontal: scale(16),
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerContent: {
    padding: scale(16),
    alignItems: 'center',
  },
  modalStyle: {
    borderTopLeftRadius: scale(12),
    borderTopRightRadius: scale(12),
  },
  modalRootStyle: {
    elevation: 10,
  },
});
