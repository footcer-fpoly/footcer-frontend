import React from 'react';
import {StyleSheet} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import TabProfile from '../../components/account/TabProfile';
import TabTeams from '../../components/account/TabTeams';
import {scale} from '../../helpers/size.helper';
import colors from '../../theme/colors';

export default function ProfileTabView() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'profile', title: 'Thông tin'},
    {key: 'teams', title: 'Đội bóng'},
  ]);
  const renderScene = SceneMap({
    profile: TabProfile,
    teams: TabTeams,
  });
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: colors.greenDark}}
      style={{backgroundColor: colors.white}}
      labelStyle={styles.label}
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
const styles = StyleSheet.create({
  label: {
    fontSize: scale(13),
    color: colors.black,
    textTransform: 'capitalize',
  },
});
