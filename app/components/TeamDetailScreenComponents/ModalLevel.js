import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class ModalLevel extends Component {
  render() {
    return (
      <View style={{backgroundColor: '#FFF', borderRadius: 10, flex: 0.5}}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 20,
            paddingHorizontal: 15,
          }}>
          <View />
          <Text style={{fontSize: 20}}>Trình độ cầu thủ</Text>
          <Icon
            name={'close'}
            size={20}
            color="#fff"
            style={{
              backgroundColor: 'red',
              borderRadius: 10,
            }}
            onPress={() => {
              this._hideDialogAddMember;
            }}
          />
        </View>
        <View style={{}}>
          <TouchableOpacity>
            <Text style={styles.txt}>Nghiệp dư</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.txt}>Bán chuyên</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.txt}>Chuyên nghiệp</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  txt: {
    fontSize: 15,
    borderTopWidth: 0.5,
    borderTopColor: '#707070',
    padding: 15,
  },
});
