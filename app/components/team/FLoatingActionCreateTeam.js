import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import rootNavigator from '../../navigations/root.navigator';
import {CREATE_TEAM_SCREEN} from '../../navigations/route-name';
import colors from '../../theme/colors';

const FloatingActionButton = () => {
  const navigateCreateTeam = () => {
    rootNavigator.navigate(CREATE_TEAM_SCREEN);
  };
  return (
    <TouchableOpacity onPress={navigateCreateTeam} style={styles.container}>
      <Icon name="add" size={scale(20)} color={colors.white} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    ...Styles.borderRadiusCircle(50),
    ...Styles.columnCenter,
    position: 'absolute',
    bottom: scale(20),
    right: scale(20),
    backgroundColor: colors.main,
  },
});
export default FloatingActionButton;
