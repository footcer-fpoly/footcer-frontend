import React from 'react';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';
import {Button, Card, Text, Modal} from '@ui-kitten/components';
import {OTP_SCREEN} from '../../navigations/route-name';

const DialogConfirmSendOPT = ({
  phone,
  flag,
  navigation,
  visible,
  dismiss,
  data,
}) => {
  const _gotoOTPScreen = (phone, flag, dismiss, data) => {
    dismiss();
    navigation.navigate(OTP_SCREEN, {phone, flag, data});
  };
  return (
    <Modal
      style={styles.container}
      backdropStyle={styles.backdrop}
      onRequestClose={dismiss}
      visible={visible}>
      <Card>
        <View>
          <Text category="h5">Xác thực số điện thoại</Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              marginTop: 5,
              color: '#16a085',
            }}>
            {phone}
          </Text>
        </View>
        <Text style={{marginVertical: 10}}>
          Chúng tôi sẻ gữi một mã xác thực đến {phone}. Bạn có muốn tiếp tục?
        </Text>
        <View style={styles.footerContainer}>
          <Button
            onPress={dismiss}
            style={styles.footerControl}
            size="small"
            status="basic">
            HỦY
          </Button>
          <Button
            onPress={() => _gotoOTPScreen(phone, flag, dismiss, data)}
            style={[
              styles.footerControl,
              {marginLeft: 10, backgroundColor: '#27ae60'},
            ]}
            size="small">
            TIẾP TỤC
          </Button>
        </View>
      </Card>
    </Modal>

    // <Modal
    //     style={styles.container}
    //     backdropStyle={styles.backdrop}
    //     onRequestClose={dismiss}
    //     visible={visible}
    //     animationIn='slideInUp'
    // >

    // </Modal >
  );
};

export default DialogConfirmSendOPT;

const styles = StyleSheet.create({
  container: {
    maxWidth: 350,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  footerContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    width: 100,
    paddingVertical: 12,
    borderWidth: 0,
  },
});
