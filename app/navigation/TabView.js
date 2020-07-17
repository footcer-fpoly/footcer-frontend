import React, {Component} from 'react';
import ScrollableTabView, {
  DefaultTabBar,
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view-forked';
import {StyleSheet, View} from 'react-native';
import TabProfile from '../components/ProfileDetailScreenComponents/TabProfile';
import TabTeams from '../components/ProfileDetailScreenComponents/TabTeams';

export default class App extends Component {
  render() {
    return (
      <ScrollableTabView
        renderTabBar={() => (
          <ScrollableTabBar
            style={styles.scrollStyle}
            tabStyle={styles.tabStyle}
          />
        )}
        tabBarTextStyle={styles.tabBarTextStyle}
        tabBarInactiveTextColor={'#676767'}
        tabBarActiveTextColor={'#000'}
        tabBarUnderlineStyle={styles.underlineStyle}
        initialPage={0}>
        <TabProfile key={'1'} tabLabel={'Thông tin '} />
        <TabTeams key={'2'} tabLabel={'Đội bóng'} />
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  tabStyle: {},
  scrollStyle: {
    backgroundColor: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
  },
  tabBarTextStyle: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  underlineStyle: {
    height: 3,
    backgroundColor: '#0AB134',
    borderRadius: 3,
    width: 15,
  },
});
