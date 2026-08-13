import React from 'react';
import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { kidsPalette } from '../../../theme/kidsPalette';
import { colors } from '../../../theme';

type Props = { width?: number | string; height?: number | string };

/** Jonas e o grande peixe — ilustração autoral para o carrossel "Continue aprendendo". */
export function JonasIllustration({ width = '100%', height = '100%' }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice">
      <Defs>
        <LinearGradient id="jnBg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={kidsPalette.tintBlue} />
          <Stop offset="1" stopColor={kidsPalette.blue} />
        </LinearGradient>
      </Defs>
      <Rect x={0} y={0} width={200} height={140} fill="url(#jnBg)" />
      <Path d="M0,96 C50,86 150,106 200,92 L200,140 L0,140 Z" fill={kidsPalette.blueDeep} opacity={0.9} />

      {/* Peixe grande */}
      <Path d="M30,80 C60,54 140,54 172,80 C140,106 60,106 30,80 Z" fill={kidsPalette.purple} />
      <Path d="M172,80 L192,64 L192,96 Z" fill={kidsPalette.purpleDeep} />
      <Circle cx={54} cy={74} r={4} fill={colors.white} />
      <Circle cx={54} cy={74} r={2} fill="#2B2118" />
      <Path d="M60,90 C70,96 90,96 100,90" stroke={kidsPalette.purpleDeep} strokeWidth={2.5} fill="none" opacity={0.7} />

      <Circle cx={30} cy={30} r={16} fill={kidsPalette.sun} opacity={0.9} />
    </Svg>
  );
}
