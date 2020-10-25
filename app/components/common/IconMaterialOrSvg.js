import React from 'react';
import {SvgXml} from 'react-native-svg';
import MaterialIcon from './MaterialIcon';

export default function IconMaterialOrSvg({type, name, style, size, SVGIcon}) {
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
  return <SvgXml xml={SVGIcon} width={size} height={size} />;
}

export const IconType = {
  MaterialIcons: 'MaterialIcons',
  MaterialCommunityIcons: 'MaterialCommunityIcons',
  Svg: 'svg',
};
