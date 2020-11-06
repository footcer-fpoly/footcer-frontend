import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {connect} from 'react-redux';
import Loading from '../components/common/loadings/Loading';
import {checkIsLogin} from '../redux/actions/auth.action';
import MainRouter from './app-navigation';

const MainNavigation = () => {
  const init = async () => {};
  useEffect(() => {
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapDispatchToProps = {
  checkIsLogin,
};

export default connect(
  null,
  mapDispatchToProps,
)(MainNavigation);
