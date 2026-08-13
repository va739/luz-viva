import React from 'react';
import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { kidsPalette } from '../../../theme/kidsPalette';

type Props = { width?: number | string; height?: number | string };

/** A Criação — ilustração autoral para o carrossel "Continue aprendendo". */
export function CriacaoIllustration({ width = '100%', height = '100%' }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice">
      <Defs>
        <LinearGradient id="crBg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={kidsPalette.tintGreen} />
          <Stop offset="1" stopColor={kidsPalette.green} />
        </LinearGradient>
      </Defs>
      <Rect x={0} y={0} width={200} height={140} fill="url(#crBg)" />
      <Circle cx={166} cy={30} r={18} fill={kidsPalette.sun} />

      <Path d="M0,120 C60,108 140,108 200,122 L200,140 L0,140 Z" fill={kidsPalette.greenDeep} />

      {/* Árvore central */}
      <Path d="M100,140 L100,90" stroke="#8A6240" strokeWidth={9} strokeLinecap="round" />
      <Circle cx={100} cy={64} r={38} fill={kidsPalette.green} />
      <Circle cx={72} cy={80} r={24} fill={kidsPalette.greenDeep} opacity={0.9} />
      <Circle cx={128} cy={80} r={24} fill={kidsPalette.greenDeep} opacity={0.9} />

      {/* Pássaro e borboleta */}
      <Path d="M46,54 L54,50 L46,58 Z" fill={kidsPalette.orange} />
      <Circle cx={44} cy={52} r={4} fill={kidsPalette.orange} />
      <Circle cx={156} cy={70} r={4} fill={kidsPalette.purple} />
      <Circle cx={162} cy={66} r={4} fill={kidsPalette.pink} />
    </Svg>
  );
}
