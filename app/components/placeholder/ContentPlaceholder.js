import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function ContentPlaceholder() {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item flexDirection="row">
        <SkeletonPlaceholder.Item width={100} height={100} borderRadius={6} />
        <SkeletonPlaceholder.Item
          flex={1}
          justifyContent={'space-between'}
          marginLeft={12}>
          <SkeletonPlaceholder.Item width="50%" height={20} borderRadius={6} />
          <SkeletonPlaceholder.Item width="100%" height={20} borderRadius={6} />
          <SkeletonPlaceholder.Item width="80%" height={20} borderRadius={6} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}
