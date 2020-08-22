import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Button, SocialIcon } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
    LoginManager,
    AccessToken,
    GraphRequest,
    GraphRequestManager,
    Permissions,
    LoginButton, ShareDialog
} from 'react-native-fbsdk';
import { checkUUID } from '../../server/SignInSignUp/sever'
import { Spinner } from '@ui-kitten/components';
import { AuthContext } from '../../navigation/AuthContext'

const LoginFb = ({ navigation }) => {

    const [loading, setLoading] = useState(false);
    const { signIn } = React.useContext(AuthContext)
    const loginFb = async () => {
        try {
            setLoading(true);

            LoginManager.logInWithPermissions(['public_profile', 'email']).then((result) => {
                if (result.isCancelled) {
                    console.log('Login cancelled');
                    setLoading(false);
                } else {
                    AccessToken.getCurrentAccessToken().then((data) => {
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
                            }, async (error, result) => {
                                if (error) {
                                    console.log(error);
                                    setLoading(false);
                                } else {
                                    const { id } = result;
                                    console.log(id)
                                    setLoading(false);
                                    const res = await checkUUID(id);
                                    if (res.code === 200) {
                                        setLoading(false);
                                        navigation.navigate('SignUpFbGgScreen', { data: result, flag: 0 })
                                    } else if (res.code === 409) {
                                        setLoading(false);
                                        signIn(res.data)
                                    } else {
                                        setLoading(false);
                                        alert('status: ', status);
                                    }
                                }
                                responseInfoCallback
                            }
                        );
                        new GraphRequestManager().addRequest(infoRequest).start();
                    });
                }
            });
        } catch (error) {
            alert('Login failed: ' + error)
        }
    }
    return (
        <View>
            <Button
                icon={
                    !loading ?
                        <FontAwesome
                            name="facebook"
                            size={30}
                            color="white"
                        /> :
                        < Spinner status='basic' size='large' />
                }
                iconLeft
                title="Đăng nhập bằng Facebook"
                titleStyle={{ marginLeft: 15 }}
                buttonStyle={styles.button}
                TouchableComponent={TouchableOpacity}
                onPress={() => loginFb()}
            />
        </View>
    );
}
export default LoginFb;
const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        backgroundColor: '#0488DB',
        paddingHorizontal: 20,
        marginTop: 20,
        width: 350,
        borderRadius: 5
    },
});
