import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function MaterialIcon(props) {
  return props.iconType === 'MaterialIcons' ? (
    <MaterialIcons {...props} />
  ) : (
    <MaterialCommunityIcons {...props} />
  );
}
