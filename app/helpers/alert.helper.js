import React from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import IconMaterialOrSvg, {
  IconType,
} from '../components/common/IconMaterialOrSvg';
import rootNavigator from '../navigations/root.navigator';
import {NOTIFICATION_SCREEN} from '../navigations/route-name';
// import {handleNavigate} from '../actions/main.action';

// import {store} from '../store/configure-store';
import colors from '../theme/colors';
import dimens from '../theme/dimens';
import {scale} from './size.helper';

export default class AlertHelper {
  static dropDown;
  static setDropDown(dropDown) {
    this.dropDown = dropDown;
  }
  static getDropDown() {
    return this.dropDown;
  }

  static alert(type, title, message, options, inMilliSeconds) {
    if (this.dropDown) {
      this.dropDown.alertWithType(
        type,
        title,
        message,
        options,
        inMilliSeconds,
      );
    }
  }

  // static onTapAlert = (data) => {
  //   switch (data.payload?.type) {
  //     case 'UPDATE_APP':
  //       Linking.openURL(data.payload?.storeUrl);
  //       break;
  //     case 'NOTIFICATION':
  //       store.dispatch(handleNavigate());
  //       break;
  //     default:
  //       return;
  //   }
  // };

  static onTapAlert = (data) => {
    if (!AlertHelper.getDropDown().lertData?.type === 'warn') {
      rootNavigator.navigate(NOTIFICATION_SCREEN);
    }
    return;
  };

  static renderImage = (props, message) => {
    return (
      <View style={styles.wrapperIcon}>
        <IconMaterialOrSvg
          type={IconType.MaterialCommunityIcons}
          size={scale(30)}
          name="bell-outline"
          style={{color: colors.white}}
        />
      </View>
    );
  };

  static NotificationAlert() {
    return (
      <DropdownAlert
        ref={(ref) => AlertHelper.setDropDown(ref)}
        useNativeDriver
        successColor={colors.success}
        infoColor={colors.secondary}
        updateStatusBar={false}
        renderImage={AlertHelper.renderImage}
        defaultContainer={{
          padding: 8,
          paddingTop: dimens.STATUS_BAR_HEIGHT,
        }}
        onClose={(data) => {}}
        onTap={AlertHelper.onTapAlert}
      />
    );
  }
}
const styles = StyleSheet.create({
  wrapperIcon: {alignItems: 'center', justifyContent: 'center'},
});
