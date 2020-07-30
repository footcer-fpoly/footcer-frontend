import React, { Component } from 'react'
import {Text, View, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


export default class HeaderBack extends Component {
    render() {

        const {title,backBtn} = this.props;

        return (
          <View
            style={[
              {
                paddingVertical: 14,
                paddingHorizontal: 21,
                justifyContent: 'center',
                backgroundColor: '#0AB134',
              },
              backBtn && {
                alignItems: 'center',
              },
            ]}>
            {backBtn && (
              <TouchableOpacity
                style={{position: 'absolute', left: 21, top: 16}}
                onPress={() => this.props.goBack()}>
                <FontAwesome5
                  name="chevron-left"
                  size={20}
                  color="#FFF"
                />
              </TouchableOpacity>
            )}
            <Text
              style={{
                fontSize: 20,
                color: '#FFF',
              }}>
              {title}
            </Text>
          </View>
        );
    }
}
