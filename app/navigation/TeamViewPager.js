import React from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import TabProfile from '../components/TeamDetailScreenComponents/TabProfile';
import TabTeams from '../components/ProfileDetailScreenComponents/TabProfile';
export default function App() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'profile', title: 'Thông tin'},
    {key: 'history', title: 'Lịch sử'},
  ]);

  const renderScene = SceneMap({
    profile: TabProfile,
    history: TabTeams,
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
