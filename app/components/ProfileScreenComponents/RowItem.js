import React, { useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';

import { View, Text, TouchableOpacity } from 'react-native';

const RowItem = ({ icon, text, onPress }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: 414,
                height: 65,
                borderBottomColor: 'grey',
                borderBottomWidth: 0.3,
            }}>
            <TouchableOpacity
                onPress={onPress}
                style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Feather
                    name={icon}
                    color="#0AB134"
                    size={25}
                    style={{ marginHorizontal: 20 }}
                />
                <Text style={{ marginLeft: 40, fontSize: 16 }}>
                    {text}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default RowItem;
