import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Button from './Button';
import axios from 'axios';

import {
    LoginManager,
    AccessToken,
    GraphRequest,
    GraphRequestManager,
    Permissions,
    LoginButton
} from 'react-native-fbsdk';

export default class LoginFb extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accessToken: '',
            avatar: null,
            name: ''
        };
    }
    async LoginFb() {
        try {
            LoginManager.logInWithPermissions(['public_profile', 'email']).then((result) => {
                if (result.isCancelled) {
                    console.log('Login cancelled');
                } else {
                    AccessToken.getCurrentAccessToken().then((data) => {
                        const accessToken = data.accessToken;
                        const responseInfoCallback = (error, result) => {
                            if (error) {
                                console.log(error);
                                console.log('Error fetching data=', error.toString());
                            } else {
                                console.log('Success fetching data=', result.toString());
                            }
                        };
                        const infoRequest = new GraphRequest(
                            '/me',
                            {
                                accessToken,
                                parameters: {
                                    fields: {
                                        string: 'email,name,first_name,middle_name,last_name',
                                    },
                                },
                            }, (error, result) => {
                                const {
                                    // picture: {
                                    //     data
                                    // },
                                    email
                                } = result;
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log(result);
                                    console.log(email);
                                    // console.log(data);

                                    // setAvatar(data);
                                    // setName(name);
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

    getBasicInfo() {

    }

    render() {
        return (
            <View>
                <Button text='Login fb' onPressBtn={() => this.LoginFb()} />
                <LoginButton
                    publishPermissions={["email"]}
                    onLoginFinished={
                        (error, result) => {
                            if (error) {
                                alert("Login failed with error: " + error.message);
                            } else if (result.isCancelled) {
                                alert("Login was cancelled");
                            } else {
                                alert("Login was successful with permissions: " + result.grantedPermissions)
                                console.log(result)
                            }
                        }
                    }
                    onLogoutFinished={() => alert("User logged out")} />

            </View>
        );
    }
}
