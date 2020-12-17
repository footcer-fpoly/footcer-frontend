import React from 'react';
import {TabView, SceneMap, TabBar, StyleSheet} from 'react-native-tab-view';
import TabFindOpponent from '../components/FindOpponentScreenComponents/TabFindOpponent';
import TabYourMatch from '../components/FindOpponentScreenComponents/TabYourMatch';
export default function FindOpponentTabView() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'find', title: 'Bắt đối thủ'},
    {key: 'match', title: 'Trận đấu của bạn'},
  ]);

  const renderScene = SceneMap({
    find: TabFindOpponent,
    match: TabYourMatch,
  });
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      activeColor={'0AB134'}
      inactiveColor={'#AAAAAA'}
      indicatorStyle={{backgroundColor: '#0AB134'}}
      style={{backgroundColor: '#fff'}}
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
