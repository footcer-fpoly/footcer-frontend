import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {set} from 'react-native-reanimated';
import {connect} from 'react-redux';
import Loading from '../components/common/loadings/Loading';
import {getToken} from '../helpers/storage.helper';
import MainRouter from './app-navigation';
import {checkIsLogin} from '../redux/actions/auth.action';

const MainNavigation = ({checkIsLogin}) => {
  const [onReady, setOnReady] = useState(false);
  const checkToken = async () => {
    const token = await getToken();
    RNBootSplash.hide({duration: 1000});
    if (!!token) {
      checkIsLogin();
    }
    setOnReady(true);
  };
  const init = async () => {
    // …do multiple async tasks
  };
  useEffect(() => {
    // init().finally(() => {});
    checkToken();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor="transparent"
        translucent
      />
      {onReady && <MainRouter />}
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
