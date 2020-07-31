import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, SocialIcon } from 'react-native-elements';
import { SvgUri } from 'react-native-svg';


export default class LoginGg extends Component {
    render() {
        const { onPress } = this.props;
        return (
            <View>
                <Button
                    icon={
                        <SvgUri
                            width='30'
                            height="30"
                            uri="https://svgshare.com/i/NPx.svg"
                        />
                    }
                    iconLeft
                    title="Đăng nhập bằng Gmail"
                    titleStyle={{ marginLeft: 15, color: 'black' }}
                    buttonStyle={styles.button}
                    TouchableComponent={TouchableOpacity}
                    onPress={onPress}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: '#0488DB',
        marginTop: 20,
        backgroundColor: 'white',
        width: 300,
        borderRadius: 20
    },
});
