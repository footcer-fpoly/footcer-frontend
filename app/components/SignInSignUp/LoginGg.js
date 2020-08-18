import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Button, SocialIcon } from 'react-native-elements';
import { SvgUri } from 'react-native-svg';


export default class LoginGg extends Component {
    render() {
        const { onPress } = this.props;
        return (
            <Button
                icon={
                    // <SvgUri
                    //     width='30'
                    //     height="30"
                    //     uri="https://svgshare.com/i/NPx.svg"
                    // />
                    <AntDesign
                        name="google"
                        size={30}
                        color="white"
                    />
                }
                iconLeft
                title="Đăng nhập bằng Google"
                titleStyle={{ marginLeft: 15, color: 'white' }}
                buttonStyle={styles.button}
                TouchableComponent={TouchableOpacity}
                onPress={onPress}
            />
        );
    }
}
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
        borderRadius: 5
    },
});
