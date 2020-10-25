import React, {useState, useRef} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {yardImage} from '../../assets/Images';
import {IconType} from '../../components/common/IconMaterialOrSvg';
import PrimaryButton from '../../components/common/PrimaryButton';
import {body2, body3, Text} from '../../components/common/Text';
import TitleTextInputField from '../../components/common/TitleTextInputField';
import ModalAddMember from '../../components/CreateTeam/ModalAddMember';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import BackIcon from '../../components/common/BackIcon';
import ModalPicker from '../../components/common/ModalPicker';
import {ListProvince} from '../../helpers/data-local.helper';
import {Host} from 'react-native-portalize';

const CreateTeamScreen = () => {
  const modalizeRef = useRef();
  const [visibleModal, setVisibleModal] = useState(false);
  const [listMember, setListMember] = useState([1, 2, 3, 4, 5, 6]);
  const toggleModal = () => {
    setVisibleModal(!visibleModal);
  };
  const onPressPickImage = () => async () => {
    try {
      const image = await ImagePicker.openPicker({
        multiple: false,
        cropping: true,
        width: 300,
        height: 400,
      });
      // 4 000 000 == 4Mb
      console.log('image onPressPickImage: ', image);
      // if (image?.size < 4000000) {
      //   const res = await updateUserService({
      //     ...data,
      //     avatar: image,
      //   });
      //   console.log('updateUserService -->res: ', res);
      // } else {
      //   alert('Ảnh quá lớn!');
      // }
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
    return (
      <View style={styles.warpperItemMem}>
        <View>
          <Image
            style={styles.imgMember}
            source={{
              uri:
                'https://upload.wikimedia.org/wikipedia/en/8/8e/Vietnam_national_football_team.png',
            }}
          />
          <TouchableOpacity style={styles.iconRemoveMem}>
            <Icon name="close-circle" size={20} color={colors.gray} />
          </TouchableOpacity>
        </View>
        <Text type={body3}>Huỳnh Bình</Text>
      </View>
    );
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
        <ImageBackground source={yardImage} style={styles.header}>
          <LinearGradient
            colors={['#00000000', '#00000070', '#00000090']}
            style={styles.center}>
            <TouchableOpacity
              onPress={onPressPickImage()}
              style={styles.warpperAvatar}>
              <Image
                source={{
                  uri:
                    'https://cdnmedia.webthethao.vn/uploads/files/17-6/Logo/mu.png',
                }}
                style={styles.avatar}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPressPickImage()}
              style={styles.iconEditImgBg}>
              <Icon name="pencil" size={18} color={colors.white} />
            </TouchableOpacity>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.body}>
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
  body: {
    ...Styles.flex1,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.medium,
    paddingTop: scale(35),
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
  warpperAvatar: {
    marginTop: scale(200),
    zIndex: 2,
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
