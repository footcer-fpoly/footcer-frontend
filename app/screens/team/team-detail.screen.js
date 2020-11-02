import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {updateUserService} from '../../api/user.api';
import {yardImage} from '../../assets/Images';
import RowProflie from '../../components/account/RowProflie';
import BackIcon from '../../components/common/BackIcon';
import {IconType} from '../../components/common/IconMaterialOrSvg';
import PrimaryButton from '../../components/common/PrimaryButton';
import SecondaryButton from '../../components/common/SecondaryButton';
import {headline4, headline5, Text} from '../../components/common/Text';
import ItemTeamMember from '../../components/team/ItemTeamMember';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';

const TeamDetailScreen = ({profile}) => {
  const [data, setData] = useState({...profile});
  const [editable, setEditable] = useState(false);
  const toogleEditable = () => {
    setEditable(!editable);
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
      if (image?.size < 4000000) {
        const res = await updateUserService({
          ...data,
          avatar: image,
        });
        console.log('updateUserService -->res: ', res);
      } else {
        alert('Ảnh quá lớn!');
      }
    } catch (error) {
      console.log('onPressPickImage -> error', error);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <BackIcon />
      <ImageBackground source={yardImage} style={styles.background}>
        <LinearGradient
          colors={['#00000000', '#00000070', '#00000090']}
          style={styles.center}>
          <View style={styles.warpperAvatar}>
            <View>
              <Image source={{uri: data?.avatar}} style={styles.avatar} />
              <TouchableOpacity
                onPress={onPressPickImage()}
                style={styles.iconEdit}>
                <Icon style={styles.iconHeader} name="pencil" size={13} />
              </TouchableOpacity>
            </View>
            <Text type={headline4} style={styles.txtName}>
              {data?.displayName}
            </Text>
          </View>
          <TouchableOpacity
            onPress={onPressPickImage()}
            style={styles.iconEditImgBg}>
            <Icon name="pencil" size={18} color={colors.white} />
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
      <View style={styles.body}>
        <View style={styles.section}>
          <View style={styles.rowBetween}>
            <Text type={headline5}>Thành viên</Text>
            <SecondaryButton
              title="Thêm thành viên"
              style={{width: scale(160)}}
            />
          </View>
          <ItemTeamMember />
        </View>
        <View style={styles.section}>
          <RowProflie
            label="Tên đội bóng"
            value={data?.level ? data?.level : 'Chọn vị trí'}
            iconType={IconType.MaterialCommunityIcons}
            iconName="chess-queen"
            // onPress={showLevel}
            // editable={editable}
          />
          <RowProflie
            label="Đội trưởng"
            value={data?.level ? data?.level : 'Chọn vị trí'}
            iconType={IconType.MaterialCommunityIcons}
            iconName="chess-queen"
            // onPress={showLevel}
            // editable={editable}
          />
          <RowProflie
            label="Số điên thoại"
            value={data?.level ? data?.level : 'Chọn vị trí'}
            iconType={IconType.MaterialCommunityIcons}
            iconName="chess-queen"
            // onPress={showLevel}
            // editable={editable}
          />
          <RowProflie
            label="Trình độ"
            value={data?.level ? data?.level : 'Chọn vị trí'}
            iconType={IconType.MaterialCommunityIcons}
            iconName="chess-queen"
            // onPress={showLevel}
            // editable={editable}
          />
          <RowProflie
            label="Tỉnh"
            value={data?.level ? data?.level : 'Chọn vị trí'}
            iconType={IconType.MaterialCommunityIcons}
            iconName="chess-queen"
            // onPress={showLevel}
            // editable={editable}
          />
        </View>
        <View style={[styles.section, {minHeight: scale(80)}]}>
          <TextInput
            style={styles.txtAddress}
            multiline={true}
            placeholder="Địa chỉ"
          />
        </View>
        <View style={styles.section}>
          {editable ? (
            <View style={styles.warpperButtonEdit}>
              <PrimaryButton
                style={[styles.flex49, {backgroundColor: colors.grayDark}]}
                title="hủy"
              />
              <PrimaryButton
                onPress={toogleEditable}
                style={[styles.flex49, {backgroundColor: colors.green}]}
                title="lưu"
              />
            </View>
          ) : (
            <PrimaryButton
              onPress={toogleEditable}
              style={{backgroundColor: colors.greenDark}}
              title="chỉnh sửa"
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex49: {flex: 0.49},
  rowBetween: {
    ...Styles.rowBetween,
  },
  center: {
    ...Styles.columnCenter,
    ...Styles.flex1,
  },
  warpperAvatar: {
    marginTop: spacing.extraLarge,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconEdit: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.grayLight,
    ...Styles.borderRadiusCircle(20),
    ...Styles.columnCenter,
  },
  background: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  txtName: {
    color: colors.white,
    marginTop: spacing.small,
  },

  avatar: {
    ...Styles.borderRadiusCircle(90),
    borderWidth: 2,
    borderColor: colors.white,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    backgroundColor: '#0AB134',
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  imgAvatar: {
    height: 85,
    width: 85,
    borderRadius: 85 / 2,
    borderWidth: 1,
    borderColor: 'white',
  },
  edit: {
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
    backgroundColor: '#707070',
    position: 'absolute',
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editName: {
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
    backgroundColor: '#707070',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  btnChangePassword: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF5E0B',
    marginTop: 5,
    justifyContent: 'center',
    width: 120,
    height: 30,
    borderRadius: 5,
  },
  iconEditImgBg: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    padding: scale(5),
    backgroundColor: colors.grayOpacity,
    borderRadius: 5,
  },
  body: {
    flex: 1,
    backgroundColor: colors.red,
  },
  section: {
    marginTop: spacing.tiny,
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.small,
    backgroundColor: colors.white,
  },
  warpperButtonEdit: {
    ...Styles.rowBetween,
  },
});

const mapDispatchToProps = {};
function mapStateToProps(state) {
  return {
    profile: state.authState.profile,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeamDetailScreen);
