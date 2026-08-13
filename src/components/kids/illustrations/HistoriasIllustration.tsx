import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { kidsPalette } from '../../../theme/kidsPalette';
import { colors } from '../../../theme';

type Props = { width?: number | string; height?: number | string };

/** Bíblia aberta — ilustração do atalho "Histórias Bíblicas". */
export function HistoriasIllustration({ width = '100%', height = '100%' }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 100 100">
      <Circle cx={50} cy={50} r={50} fill={kidsPalette.tintPurple} />
      <Path d="M50,36 C44,30 30,28 24,32 L24,68 C30,64 44,66 50,72 Z" fill={colors.white} stroke={kidsPalette.purple} strokeWidth={2} />
      <Path d="M50,36 C56,30 70,28 76,32 L76,68 C70,64 56,66 50,72 Z" fill={colors.white} stroke={kidsPalette.purple} strokeWidth={2} />
      <Path d="M32,40 L42,40 M32,48 L42,48 M32,56 L42,56" stroke={kidsPalette.purple} strokeWidth={2} strokeLinecap="round" opacity={0.6} />
      <Path d="M58,40 L68,40 M58,48 L68,48 M58,56 L68,56" stroke={kidsPalette.purple} strokeWidth={2} strokeLinecap="round" opacity={0.6} />
    </Svg>
  );
}
