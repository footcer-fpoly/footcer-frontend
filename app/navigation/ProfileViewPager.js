import React from 'react';
import TabProfile from '../components/ProfileDetailScreenComponents/TabProfile';
import TabTeams from '../components/ProfileDetailScreenComponents/TabTeams';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

export default function ProfileViewPager() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'profile', title: 'Thông tin'},
    {key: 'teams', title: 'Đội bóng'},
  ]);
  const renderScene = SceneMap({
    profile: TabProfile,
    teams: TabTeams,
  });
  const renderTabBar = props => (
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
