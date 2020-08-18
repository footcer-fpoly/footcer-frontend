import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class LoginMore extends Component {

    render() {
        return (
            <View style={styles.more}>
                <Text style={styles.txtMore}>Hoặc</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    more: {
        width: '100%',
        marginTop: 10,
        alignItems: 'center'
    },

    txtMore: {
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#676767',
        fontWeight: 'bold',
        borderRadius: 10,

    }
});
