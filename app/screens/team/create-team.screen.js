import React, {useRef, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Host} from 'react-native-portalize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Avatar from '../../components/common/Avatar';
import BackgroudImage from '../../components/common/BackgroudImage';
import BackIcon from '../../components/common/BackIcon';
import {IconType} from '../../components/common/IconMaterialOrSvg';
import ModalPicker from '../../components/common/ModalPicker';
import PrimaryButton from '../../components/common/PrimaryButton';
import TitleTextInputField from '../../components/common/TitleTextInputField';
import ModalAddMember from '../../components/CreateTeam/ModalAddMember';
import ItemTeamMember from '../../components/team/ItemTeamMember';
import {ListProvince} from '../../helpers/data-local.helper';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';

const CreateTeamScreen = () => {
  const modalizeRef = useRef();
  const [visibleModal, setVisibleModal] = useState(false);
  const [listMember, setListMember] = useState([1, 2, 3, 4, 5, 6]);
  const [dataTeam, setDataTeam] = useState({
    background: '',
    avatar: '',
  });
  const toggleModal = () => {
    setVisibleModal(!visibleModal);
  };
  const onPressPickImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        multiple: false,
        cropping: true,
        width: 300,
        height: 400,
      });
      console.log('image onPressPickImage: ', image);
    } catch (error) {
      console.log('onPressPickImage -> error', error);
    }
  };
  const showProvince = () => {
    showDialog({
      type: 'province',
      titleModal: 'Chọn khu vực',
      listItems: ListProvince,
    });
  };

  const showDialog = ({type, titleModal, listItems}) => {
    if (modalizeRef.current) {
      modalizeRef.current.setDataAndOpenModal({
        type,
        title: titleModal,
        listItems: listItems,
      });
    }
  };
  const onSelectItem = itemData => {
    console.log('itemData: ', itemData);
    let keyState = null;
    switch (itemData.type) {
      case 'province':
        keyState = 'level';
        break;
      default:
        break;
    }
    // if (keyState) {
    //   setData({
    //     ...data,
    //     [keyState]: itemData?.item?.name,
    //   });
    // }
  };
  const renderItem = item => {
    return <ItemTeamMember />;
  };

  const renderCreateMember = () => {
    return (
      <View style={styles.warpperCreateMember}>
        <TouchableOpacity onPress={toggleModal} style={styles.btnCreate}>
          <Icon name="plus" size={40} color={colors.white} />
        </TouchableOpacity>
        <FlatList
          data={listMember}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.listMember}
          keyExtractor={item => item}
          renderItem={renderItem}
        />
      </View>
    );
  };
  return (
    <Host>
      <ScrollView style={styles.container}>
        <ModalAddMember visible={visibleModal} />
        <BackIcon />
        <BackgroudImage
          height={scale(220)}
          image={dataTeam.background}
          onPress={onPressPickImage}
        />
        <View style={styles.body}>
          <View style={styles.warpperAvatar}>
            <Avatar
              style={{marginTop: scale(-65)}}
              image={dataTeam.avatar}
              size={130}
              iconEdit={true}
              disabledImage={true}
              onPress={onPressPickImage}
              borderWidth={2}
              borderColor={colors.black}
            />
          </View>
          <TitleTextInputField
            style={styles.inputField}
            lable="Tên đội bóng của bạn (*)"
            typeLeft={IconType.MaterialCommunityIcons}
            iconNameLeft="account-group"
            otherTextInputProps={{
              placeholder: 'Nhập tên đội bóng của bạn',
            }}
            sizeIcon={scale(22)}
          />
          <TitleTextInputField
            style={styles.inputField}
            lable="Khu vực thi đấu của bạn (*)"
            typeLeft={IconType.MaterialIcons}
            iconNameLeft="location-pin"
            otherTextInputProps={{
              placeholder: 'Chọn khu vưc thi đấu',
            }}
            value=""
            typeRigth={IconType.MaterialIcons}
            iconNameRigth="keyboard-arrow-down"
            sizeIcon={scale(22)}
            onPress={showProvince}
          />
          <TitleTextInputField
            style={styles.inputField}
            lable="Mô tả đội bóng"
            sizeIcon={scale(22)}
            otherTextInputProps={{
              multiline: true,
              placeholder: 'Mô tả',
            }}
          />
          <TitleTextInputField
            style={styles.inputField}
            lable="Thêm thành viên"
            sizeIcon={scale(22)}
            customelement={renderCreateMember()}
          />
          <PrimaryButton style={styles.button} title="Tạo đội" />
        </View>
        <ModalPicker ref={modalizeRef} onSelectItem={onSelectItem} />
      </ScrollView>
    </Host>
  );
};

const styles = StyleSheet.create({
  center: {...Styles.columnCenter, ...Styles.flex1},
  container: {
    ...Styles.flex1,
    backgroundColor: colors.white,
  },
  warpperAvatar: {
    ...Styles.columnCenter,
    width: '100%',
    marginBottom: scale(20),
  },
  body: {
    ...Styles.flex1,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.medium,
    // paddingTop: scale(35),
  },
  header: {
    width: '100%',
    height: scale(220),
    resizeMode: 'cover',
    justifyContent: 'center',
    zIndex: 2,
  },
  iconEditImgBg: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    padding: scale(5),
    backgroundColor: colors.grayOpacity,
    borderRadius: 5,
  },
  avatar: {
    ...Styles.borderRadiusCircle(120),
    ...Styles.borderColor(colors.gray, 2),
  },
  inputField: {
    marginTop: spacing.large,
  },
  warpperCreateMember: {
    ...Styles.rowAlignCenter,
    padding: spacing.small,
  },
  btnCreate: {
    ...Styles.borderRadiusCircle(40),
    backgroundColor: colors.grayOpacity,
    marginRight: spacing.medium,
  },
  listMember: {
    zIndex: 9,
  },
  imgMember: {
    ...Styles.borderRadiusCircle(50),
    marginBottom: spacing.medium,
  },
  warpperItemMem: {
    ...Styles.columnCenter,
    marginRight: spacing.large,
  },
  button: {
    backgroundColor: colors.green,
    marginTop: spacing.extraLarge,
    paddingVertical: scale(25),
  },
  iconRemoveMem: {
    position: 'absolute',
    top: 0,
    right: -8,
  },
});

export default CreateTeamScreen;
