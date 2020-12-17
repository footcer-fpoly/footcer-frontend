import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {connect} from 'react-redux';
import Loading from '../components/common/loadings/Loading';
import {ToastHelper} from '../helpers/ToastHelper';
import {checkIsLogin} from '../redux/actions/auth.action';
import MainRouter from './app-navigation';
import {requestPermissionLocation} from '../redux/actions/auth.action';
import {getDomain} from '../redux/actions/app.action';
import database from '@react-native-firebase/database';
import {saveDomain} from '../helpers/storage.helper';

const MainNavigation = ({requestPermissionLocation, getDomain}) => {
  const init = async () => {};
  useEffect(() => {
    requestPermissionLocation();
    database()
      .ref('/settings/domain')
      .on('value', (snapshot) => {
        getDomain(snapshot.val());
      });
    init().finally(() => {
      RNBootSplash.hide({duration: 250});
    });
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
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
  getDomain,
};

export default connect(null, mapDispatchToProps)(MainNavigation);
