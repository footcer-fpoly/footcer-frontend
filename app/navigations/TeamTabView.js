import React from 'react';
import {TabView, SceneMap, TabBar, StyleSheet} from 'react-native-tab-view';
import TabProfileTeam from '../components/TeamDetailScreenComponents/TabProfileTeam';
import TabTeams from '../components/TeamDetailScreenComponents/TabProfileTeam';
export default function TeamTabView() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'profileTeam', title: 'Thông tin'},
    {key: 'history', title: 'Lịch sử'},
  ]);

  const renderScene = SceneMap({
    profileTeam: TabProfileTeam,
    history: TabTeams,
  });
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: '#0AB134'}}
      style={{backgroundColor: '#fff'}}
      labelStyle={{color: '#000', fontSize: 15}}
    />
  );
  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
    />
  );
}
