//src/Utils/UI/Alert/Alert.js
import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { Button, Card, Modal } from '@ui-kitten/components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
export default ({ visible, text }) => {
    return (
        <View style={styles.container}>
            <Modal
                visible={visible}
                backdropStyle={styles.backdrop}>
                <Card disabled={true} style={styles.container}>
                    <View style={styles.content}>
                        <Animatable.View animation="zoomIn" >
                            <AntDesign
                                name="checkcircle"
                                color={'#00C27F'}
                                size={50}
                            />
                        </Animatable.View>
                        <Text style={styles.text}>{text}</Text>
                    </View>
                </Card>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        maxWidth: 300,
        borderRadius: 10
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    content: {
        alignItems: 'center'
    },
    text: {
        marginTop: 20,
        color: '#05375a',
        fontSize: 18
    }
});