import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button} from 'react-native-elements';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {checkUUIDService} from '../../api/auth.api';
import {StatusCode} from '../../api/status-code';
import {SIGN_UP_FB_GG_SCREEN} from '../../navigations/route-name';
import {showLoading, hideLoading} from '../../redux/actions/loading.action';
import {login} from '../../redux/actions/auth.action';

const LoginFb = ({navigation, login, showLoading, hideLoading}) => {
  const [loading, setLoading] = useState(false);
  // const {signIn} = React.useContext(AuthContext);
  const loginFb = async () => {
    try {
      setLoading(true);

      LoginManager.logInWithPermissions(['public_profile', 'email']).then(
        result => {
          if (result.isCancelled) {
            console.log('Login cancelled');
            setLoading(false);
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              const accessToken = data.accessToken;
              const responseInfoCallback = (error, result) => {
                if (error) {
                  console.log(error);
                  console.log('Error fetching data=', error.toString());
                  setLoading(false);
                  return false;
                } else {
                  console.log('Success fetching data=', result.toString());
                  setLoading(false);
                }
              };
              const infoRequest = new GraphRequest(
                '/me',
                {
                  accessToken,
                  parameters: {
                    fields: {
                      string: 'id,email,name,picture.height(10000)',
                    },
                  },
                },
                async (error, result) => {
                  if (error) {
                    console.log(error);
                    setLoading(false);
                  } else {
                    const {id} = result;
                    console.log(id);
                    setLoading(false);
                    const res = await checkUUIDService(id);
                    console.log('checkUUIDService => res: ', res);
                    if (res.code === StatusCode.SUCCESS) {
                      setLoading(false);
                      navigation.navigate(SIGN_UP_FB_GG_SCREEN, {
                        data: result,
                        flag: 0,
                      });
                    } else if (res.code === StatusCode.checkUUID.ALLOW_LOGIN) {
                      setLoading(false);
                      login(res.data);
                    } else {
                      setLoading(false);
                      console.log('checkUUIDService => res.code', res.code);
                    }
                  }
                  responseInfoCallback;
                },
              );
              new GraphRequestManager().addRequest(infoRequest).start();
            });
          }
        },
      );
    } catch (error) {
      alert('Login failed: ' + error);
    }
  };
  return (
    <View>
      <Button
        icon={
          !loading ? (
            <FontAwesome name="facebook" size={30} color="white" />
          ) : (
            <ActivityIndicator color="white" size="large" />
          )
        }
        iconLeft
        title="Đăng nhập bằng Facebook"
        titleStyle={{marginLeft: 15}}
        buttonStyle={styles.button}
        TouchableComponent={TouchableOpacity}
        onPress={loginFb}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    backgroundColor: '#0488DB',
    paddingHorizontal: 20,
    marginTop: 20,
    width: 350,
    borderRadius: 5,
  },
});

const mapDispatchToProps = {
  showLoading,
  hideLoading,
  login,
};

export default connect(
  null,
  mapDispatchToProps,
)(LoginFb);
