import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {yardImage} from '../../assets/Images';
import BackIcon from '../../components/common/BackIcon';
import {headline4, Text} from '../../components/common/Text';
import Styles from '../../helpers/styles.helper';
import ProfileTabView from '../../navigations/tab-view/profile-tab.navigation';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import {updateUserService} from '../../api/user.api';

const ProfileDetailScreen = ({profile}) => {
  const [data, setData] = useState({...profile});

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
    <View style={styles.container}>
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
                <Icon style={styles.iconHeader} name="edit" size={13} />
              </TouchableOpacity>
            </View>
            <Text type={headline4} style={styles.txtName}>
              {data?.displayName}
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
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

const mapDispatchToProps = {};
function mapStateToProps(state) {
  return {
    profile: state.authState.profile,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileDetailScreen);
