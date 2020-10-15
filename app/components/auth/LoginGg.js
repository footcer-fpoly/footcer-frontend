import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {Spinner} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AuthContext} from '../../navigations/AuthContext';
import {checkUUID} from '../../server/SignInSignUp/sever';
import {AppConfig} from '../../configs/app.config';

const LoginGg = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    googleSignin();
  }, []);
  const {signIn} = React.useContext(AuthContext);
  const googleSignin = () => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: AppConfig.webClientId, // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    });
  };
  const loginGg = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const {id} = userInfo.user;
      const res = await checkUUID(id);
      if (res.code === 200) {
        setLoading(false);
        navigation.navigate('SignUpFbGgScreen', {data: userInfo.user, flag: 1});
      } else if (res.code === 409) {
        setLoading(false);
        signIn(res.data);
      } else {
        setLoading(false);
        alert(statusCodes);
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setLoading(false);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setLoading(false);
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setLoading(false);
        // play services not available or outdated
      } else {
        setLoading(false);
        // some other error happened
      }
      console.log(error);
    }
  };

  return (
    <Button
      icon={
        !loading ? (
          <AntDesign name="google" size={30} color="white" />
        ) : (
          <Spinner status="basic" size="large" />
        )
      }
      iconLeft
      title="Đăng nhập bằng Google"
      titleStyle={{marginLeft: 15, color: 'white'}}
      buttonStyle={styles.button}
      TouchableComponent={TouchableOpacity}
      onPress={loginGg}
    />
  );
};
export default LoginGg;
const styles = StyleSheet.create({
  button: {
    // marginTop: 20,
    // backgroundColor: '#e74c3c',
    // width: 350,
    // borderRadius: 5,

    paddingVertical: 10,
    backgroundColor: '#e74c3c',
    paddingHorizontal: 20,
    marginTop: 20,
    width: 350,
    borderRadius: 5,
  },
});
