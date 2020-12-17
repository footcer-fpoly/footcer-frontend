import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {connect} from 'react-redux';
import {StatusCode} from '../../api/status-code';
import {updateAvatarUserService} from '../../api/user.api';
import Avatar from '../../components/common/Avatar';
import BackgroudImage from '../../components/common/BackgroudImage';
import BackIcon from '../../components/common/BackIcon';
import {headline4, Text} from '../../components/common/Text';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import {ToastHelper} from '../../helpers/ToastHelper';
import ProfileTabView from '../../navigations/tab-view/profile-tab.navigation';
import {updateAvatarUser} from '../../redux/actions/auth.action';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';

const ProfileDetailScreen = ({profile, updateAvatarUser}) => {
  const [avatar, setAvatar] = useState(profile?.avatar);
  const onPressPickImage = () => async () => {
    const image = await ImagePicker.openPicker({
      multiple: false,
      cropping: true,
      width: 300,
      height: 400,
    });
    const res = await updateAvatarUserService({
      avatar: image,
      phone: profile.phone,
    });
    if (res && res.code === StatusCode.SUCCESS) {
      setAvatar(res?.data?.avatar);
      updateAvatarUser(res?.data?.avatar);
      ToastHelper.showToast('Cập nhật ảnh đại diện thành công');
    } else {
      alert('Update avatar failed');
    }
    console.log('res: ', res);
    try {
    } catch (error) {
      console.log('onPressPickImage -> error', error);
    }
  };
  return (
    <View style={styles.container}>
      <BackIcon />
      <BackgroudImage
        height={scale(220)}
        disabledImage={true}
        children={
          <>
            <Avatar
              image={avatar}
              size={90}
              iconEdit={true}
              onPress={onPressPickImage()}
            />
            <Text type={headline4} style={styles.txtName}>
              {profile?.displayName}
            </Text>
          </>
        }
      />
      <View style={styles.body}>
        <ProfileTabView />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txtName: {
    color: colors.white,
    marginTop: spacing.small,
  },
  body: {
    flex: 1,
  },
});

const mapDispatchToProps = {updateAvatarUser};
function mapStateToProps(state) {
  return {
    profile: state.authState.profile,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileDetailScreen);
