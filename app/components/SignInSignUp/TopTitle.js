import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class TopTitle extends Component {

    render() {
        const { title, sub1Title, sub2Title } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subTitle}>{sub1Title}</Text>
                <Text style={styles.subTitle}>{sub2Title}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width:'100%',
        marginBottom:50,
    },
    title: {
        fontSize:22,
        color:'white',
        fontWeight:'bold',
        textAlign:'center',
        marginBottom:10
    },
    subTitle:{
        fontSize:16,
        color:'white',
        textAlign:'center'

    }
});
