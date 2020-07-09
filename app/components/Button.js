import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class Buton extends Component {
    render() {
        const {text} = this.props;
        return (
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.textBtn}>{text}</Text>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    btn: {
        paddingVertical:15,
        backgroundColor:'#008312',
        width:'90%',
        alignItems:'center',
        color:'white',
        borderRadius: 30,
    },
    textBtn:{
        color:'white',
        fontSize:20,
        fontWeight:'bold',
        textTransform:'uppercase'
    }
});
