import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { kidsPalette } from '../../../theme/kidsPalette';

type Props = { width?: number | string; height?: number | string };

/** Coração — ilustração do atalho "Versículo do Dia". */
export function VersiculoIllustration({ width = '100%', height = '100%' }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 100 100">
      <Circle cx={50} cy={50} r={50} fill={kidsPalette.tintBlue} />
      <Path
        d="M50,68 C30,54 24,42 30,32 C36,24 48,26 50,36 C52,26 64,24 70,32 C76,42 70,54 50,68 Z"
        fill={kidsPalette.blue}
      />
      <Path d="M42,42 L58,42 M46,48 L54,48" stroke={kidsPalette.tintBlue} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}
