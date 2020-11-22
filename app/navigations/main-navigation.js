import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {connect} from 'react-redux';
import Loading from '../components/common/loadings/Loading';
import {ToastHelper} from '../helpers/ToastHelper';
import {checkIsLogin} from '../redux/actions/auth.action';
import MainRouter from './app-navigation';
import {requestPermissionLocation} from '../redux/actions/auth.action';

const MainNavigation = ({requestPermissionLocation}) => {
  const init = async () => {};
  useEffect(() => {
    requestPermissionLocation();
    init().finally(() => {
      RNBootSplash.hide({duration: 250});
    });
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor="transparent"
        translucent
      />
      <MainRouter />
      <Loading />
      <ToastHelper.ToastContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapDispatchToProps = {
  requestPermissionLocation,
};

export default connect(
  null,
  mapDispatchToProps,
)(MainNavigation);
