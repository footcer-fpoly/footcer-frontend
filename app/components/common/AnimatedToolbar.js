// import React from 'react';
// import {View, Text, Animated, StyleSheet} from 'react-native';
// import colors from '../../theme/colors';

// const HEADER_MAX_HEIGHT = 200;
// const HEADER_MIN_HEIGHT = 60;
// const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

// export default function AnimatedToolbar({scrollY}) {
//   const toolBarFadeIn = scrollY.interpolate({
//     inputRange: [0, HEADER_SCROLL_DISTANCE],
//     outputRange: ['transparent', colors.white],
//     extrapolate: 'clamp',
//   });
//   const fadeIn0To1 = scrollY.interpolate({
//     inputRange: [0, HEADER_SCROLL_DISTANCE],
//     outputRange: [0, 1],
//     extrapolate: 'clamp',
//   });
//   const renderToolbar = () => {
//     return (
//       <Animated.View style={styles.toolbarContainer(fadeIn0To1, toolBarFadeIn)}>
//         <IconButton iconName="chevron-left" onPress={backButtonPress} />
//         <Animated.Text
//           type={headline3}
//           style={styles.textTitleToolBar(fadeIn0To1)}>
//           {t.translate('property_details')}
//         </Animated.Text>
//         <View style={styles.rowCenter}>
//           <CountStar
//             isFavorite={detailAuction?.isFavorited}
//             count={detailAuction.counterFavorite}
//             onPress={toggleFavoriteAuction}
//           />
//           <IconButton
//             iconName="share"
//             iconSize={scale(15)}
//             style={{marginLeft: scale(5)}}
//           />
//         </View>
//       </Animated.View>
//     );
//   };
//   return (
//     <View>
//       <Text> AnimateToolbar </Text>
//     </View>
//   );
// }
// const styles = StyleSheet.create({});
