import React, {Component} from 'react';
import {View} from 'react-native-animatable';
import Loading from './components/common/loadings/Loading';
import MainNavigation from './navigations/AppNavigation';
export default class App extends Component {
  render() {
    return <MainNavigation />;
  }
}
