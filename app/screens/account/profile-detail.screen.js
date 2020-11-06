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
      alert('Update avatar thành công');
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
        children={
          <>
            <Avatar
              image={avatar}
              size={90}
              iconEdit={true}
              disabledImage={true}
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
