import React from 'react';
import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { kidsPalette } from '../../../theme/kidsPalette';

type Props = { width?: number | string; height?: number | string };

/** Daniel na cova dos leões — ilustração autoral para o carrossel "Continue aprendendo". */
export function DanielIllustration({ width = '100%', height = '100%' }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice">
      <Defs>
        <LinearGradient id="dnBg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={kidsPalette.tintPurple} />
          <Stop offset="1" stopColor={kidsPalette.purple} />
        </LinearGradient>
      </Defs>
      <Rect x={0} y={0} width={200} height={140} fill="url(#dnBg)" />
      <Path d="M0,112 C60,100 140,100 200,114 L200,140 L0,140 Z" fill="#8A6240" />

      {/* Daniel ao centro, em oração */}
      <Path d="M86,132 C86,108 114,108 114,132 Z" fill={kidsPalette.blue} />
      <Circle cx={100} cy={100} r={15} fill="#C98857" />
      <Path d="M86,98 C86,84 114,84 114,98" stroke="#3B2A1D" strokeWidth={5} fill="none" />

      {/* Leões dos lados */}
      <Circle cx={48} cy={116} r={16} fill={kidsPalette.yellow} />
      <Circle cx={40} cy={106} r={6} fill={kidsPalette.yellowDeep} opacity={0.8} />
      <Circle cx={56} cy={106} r={6} fill={kidsPalette.yellowDeep} opacity={0.8} />
      <Circle cx={44} cy={112} r={1.6} fill="#3B2A1D" />
      <Circle cx={52} cy={112} r={1.6} fill="#3B2A1D" />

      <Circle cx={152} cy={116} r={16} fill={kidsPalette.yellow} />
      <Circle cx={144} cy={106} r={6} fill={kidsPalette.yellowDeep} opacity={0.8} />
      <Circle cx={160} cy={106} r={6} fill={kidsPalette.yellowDeep} opacity={0.8} />
      <Circle cx={148} cy={112} r={1.6} fill="#3B2A1D" />
      <Circle cx={156} cy={112} r={1.6} fill="#3B2A1D" />
    </Svg>
  );
}
