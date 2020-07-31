import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { Button, SocialIcon } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default class LoginFb extends Component {
    render() {
        const { onPress } = this.props;
        return (
            <View>
                <Button
                    icon={
                        <FontAwesome
                            name="facebook"
                            size={30}
                            color="white"
                        />
                    }
                    iconLeft
                    title="Đăng nhập bằng Facebook"
                    titleStyle={{ marginLeft: 15 }}
                    buttonStyle={styles.button}
                    onPress={onPress}
                />
                {/* <SocialIcon
                    title='Đăng nhập bằng Google'
                    button
                    component={TouchableHighlight}
                    type='google'
                />
                <SocialIcon
                    title='Đăng nhập bằng Facebook'
                    button
                    type='facebook'
                /> */}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        backgroundColor: '#0488DB',
        paddingHorizontal: 20,
        borderRadius: 50,
    },
});
