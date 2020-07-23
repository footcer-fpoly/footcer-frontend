import React, {Component} from 'react';
import {Text, View} from 'react-native';

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
              this._hideDialogPosition;
            }}
          />
        </View>
        <View style={{}}>
          <TouchableOpacity>
            <Text style={styles.txtLevel}>Nghiệp dư</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.txtLevel}>Bán chuyên</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.txtLevel}>Chuyên nghiệp</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  txtLevel: {
    fontSize: 15,
    borderTopWidth: 0.5,
    borderTopColor: '#707070',
    padding: 15,
  },
});
