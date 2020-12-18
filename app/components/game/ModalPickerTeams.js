import React, {useImperativeHandle, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {scale, verticalScale} from '../../helpers/size.helper';
import colors from '../../theme/colors';
import CardMyTeam from '../team/CardMyTeam';
import {body2, headline3, Text} from '../common/Text';

const ModalPickerTeams = React.forwardRef(
  ({onSelectItem, listTeam, profile}, ref) => {
    const modalizeRef = useRef();
    const listMyTeam = listTeam?.filter(
      (item) => item?.leaderId === profile?.userId,
    );

    const openModal = () => {
      if (modalizeRef.current) {
        modalizeRef.current.open();
      }
    };

    useImperativeHandle(ref, () => ({
      openModal,
    }));
    const onPressItem = (item) => () => {
      if (onSelectItem) {
        onSelectItem({item});
      }
      if (modalizeRef.current) {
        modalizeRef.current.close();
      }
    };

    const renderItem = ({item, index}) => {
      return (
        <CardMyTeam width={'100%'} onPress={onPressItem(item)} item={item} />
      );
    };

    const renderHeader = () => {
      return (
        <View style={styles.headerContent}>
          <Text type={headline3} style={{color: colors.grayDark}}>
            Chọn đội bóng của bạn
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
            data: listMyTeam,
            renderItem: renderItem,
            bounces: false,
            keyExtractor: (item, index) => item.id + index.toString(),
            showsVerticalScrollIndicator: false,
          }}
          HeaderComponent={renderHeader()}
        />
      </Portal>
    );
  },
);

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
function mapStateToProps(state) {
  return {
    profile: state.authState.profile,
    listTeam: state.teamsState.listTeam,
  };
}
export default connect(mapStateToProps, null, null, {
  forwardRef: true,
})(ModalPickerTeams);
