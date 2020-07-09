import React, { Component } from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';

export default class InputCus extends Component {

    render() {
        const {txtPlace} = this.props;
        return (
            <TextInput
                placeholder={txtPlace}
                style={styles.input}
            >
            </TextInput>
        );
    }
}
const styles = StyleSheet.create({
    input: {
        paddingVertical: 15,
        width: '90%',
        alignItems: 'center',
        color: 'white',
        borderRadius: 30,
    }
});
