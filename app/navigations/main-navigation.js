import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import Loading from '../components/common/loadings/Loading';
import MainRouter from './app-navigation';

const MainNavigation = ({}) => {
  const init = async () => {
    // …do multiple async tasks
  };
  useEffect(() => {
    init().finally(() => {
      RNBootSplash.hide({duration: 1000});
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

export default MainNavigation;
