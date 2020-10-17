import React from 'react';
import MaterialIcon from './MaterialIcon';
import {SvgXml} from 'react-native-svg';

export default function IconMaterialOrImageOrSvg({
  type,
  name,
  style,
  size,
  nameSvg,
}) {
  if (
    [IconType.MaterialIcons, IconType.MaterialCommunityIcons].includes(type)
  ) {
    return (
      <MaterialIcon
        iconType={type}
        name={name}
        style={[{fontSize: size}, style]}
      />
    );
  }
  return <SvgXml width={size} height={size} xml={nameSvg} />;
}

export const IconType = {
  MaterialIcons: 'MaterialIcons',
  MaterialCommunityIcons: 'MaterialCommunityIcons',
  Svg: 'svg',
};
