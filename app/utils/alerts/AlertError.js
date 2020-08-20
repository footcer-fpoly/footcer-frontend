//src/Utils/UI/Alert/Alert.js
import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { Button, Card, Modal } from '@ui-kitten/components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
export default ({ visible, text, dismiss }) => {
    useEffect(() => {
        setTimeout(() => dismiss(), 3000);
    }, [visible])
    return (
        <View style={styles.container}>
            <Modal
                visible={visible}
                onRequestClose={dismiss}
                backdropStyle={styles.backdrop}>
                <Card disabled={true} style={styles.container}>
                    <View style={styles.content}>
                        <Animatable.View animation="zoomIn" >
                            <MaterialIcons
                                name="error"
                                color={'#e74c3c'}
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
        marginTop: 10,
        marginBottom: 20,
        color: '#05375a',
        fontSize: 18
    }
});