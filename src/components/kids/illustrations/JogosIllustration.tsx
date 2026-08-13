import React from 'react';
import Svg, { Circle, Rect } from 'react-native-svg';
import { kidsPalette } from '../../../theme/kidsPalette';
import { colors } from '../../../theme';

type Props = { width?: number | string; height?: number | string };

/** Dado colorido — ilustração do atalho "Jogos Bíblicos". */
export function JogosIllustration({ width = '100%', height = '100%' }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 100 100">
      <Circle cx={50} cy={50} r={50} fill={kidsPalette.tintGreen} />
      <Rect x={30} y={30} width={40} height={40} rx={10} fill={kidsPalette.green} />
      <Circle cx={40} cy={40} r={3.4} fill={colors.white} />
      <Circle cx={60} cy={40} r={3.4} fill={colors.white} />
      <Circle cx={40} cy={60} r={3.4} fill={colors.white} />
      <Circle cx={60} cy={60} r={3.4} fill={colors.white} />
      <Circle cx={50} cy={50} r={3.4} fill={colors.white} />
    </Svg>
  );
}
