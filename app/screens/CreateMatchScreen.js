import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import ItemHeader from '../components/ItemHeader';
import ButtonDate from '../components/CreateMatchScreenComponents/ButonModalDate';
import ButtonSize from '../components/CreateMatchScreenComponents/ButtonSize';

export default class CreateMatchScreen extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#EDEDED'}}>
        <View style={styles.headerContainer}>
          <ItemHeader titleHeader="Tạo trận đấu" />
        </View>
        <View style={styles.bodyContainer}>
          <ScrollView>
            <View style={styles.viewSection}>
              <View style={styles.section}>
                <Text style={styles.txt}>Chọn team</Text>
                <TouchableOpacity style={styles.right}>
                  <Text style={styles.txt2}>Nhấn để chọn</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.sectionLast}>
                <Text style={styles.txt}>Sân bóng</Text>
                <TouchableOpacity style={styles.right}>
                  <Text style={styles.txt2}>Nhấn để chọn</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.viewSection}>
              <View style={styles.section}>
                <Text style={styles.txt}>Thời gian</Text>
                <View style={styles.right}>
                  <ButtonDate />
                </View>
              </View>
              <View style={styles.section}>
                <Text style={styles.txt}>Thời lượng</Text>
                <TouchableOpacity style={styles.right}>
                  <Text style={styles.txt2}>90 phút</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.sectionLast}>
                <Text style={styles.txt}>Kiểu thi đấu</Text>
                <View style={styles.right}>
                  <ButtonSize />
                </View>
              </View>
            </View>
            <Text style={styles.txtDetail}>Chi tiết trận đấu</Text>
            <View style={styles.viewSection}>
              <View style={{height: 150}}>
                <TextInput
                  style={styles.txtMessage}
                  placeholder="Để lại lời nhắn cho đối thủ"
                  multiline
                />
              </View>
            </View>
            <TouchableOpacity style={styles.btnCreate}>
              <Text style={styles.txtCreateMatch}>TẠO TRẬN</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: 20,
    borderBottomColor: '#000',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
  },
  sectionLast: {
    paddingVertical: 20,
    flexDirection: 'row',
  },
  viewSection: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  txt: {
    fontSize: 14,
    color: '#676767',
    textAlign: 'left',
    flex: 0.4,
  },
  txt2: {
    fontSize: 14,
  },
  right: {
    flex: 1,
  },
  txtDetail: {
    fontSize: 15,
    marginHorizontal: 10,
    marginTop: 10,
  },
  txtMessage: {
    fontSize: 15,
    maxHeight: 150,
  },
  txtCreateMatch: {
    fontSize: 16,
    color: '#fff',
  },
  btnCreate: {
    marginTop: 20,
    backgroundColor: '#0AB134',
    alignItems: 'center',
    paddingVertical: 10,
  },
});
