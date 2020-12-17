import React from 'react';
import {StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ImagePlaceholder({size}) {
  return (
    <View style={styles.flex1}>
      <SkeletonPlaceholder highlightColor="#F4F8FC">
        <SkeletonPlaceholder.Item width="100%" height="100%" />
      </SkeletonPlaceholder>
      <View style={styles.imageContainer}>
        <Icon name="image-filter-hdr" style={styles.iconContainer(size)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: (size) => ({fontSize: size, color: '#FFFFFF'}),
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
});
