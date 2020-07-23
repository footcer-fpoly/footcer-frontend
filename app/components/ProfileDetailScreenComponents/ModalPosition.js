import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class ModalPosition extends Component {
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
          <Text style={{fontSize: 20}}>Chọn vị trí</Text>
          <Icon
            name={'close'}
            size={20}
            color="#fff"
            style={{
              backgroundColor: 'red',
              borderRadius: 10,
            }}
            onPress={() => {
              this._hideDialogPosition;
            }}
          />
        </View>
        <View style={{}}>
          <TouchableOpacity>
            <Text style={styles.txtPosition}>Thủ môn</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.txtPosition}>Hậu vệ</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.txtPosition}>Tiền vệ</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.txtPosition}>Tiền đạo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
