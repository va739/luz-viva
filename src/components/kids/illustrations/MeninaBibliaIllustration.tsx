import React from 'react';
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { kidsPalette } from '../../../theme/kidsPalette';

type Props = { width?: number | string; height?: number | string };

/**
 * Menina segurando uma Bíblia — representa a faixa etária 10 a 12 anos.
 */
export function MeninaBibliaIllustration({ width = '100%', height = '100%' }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
      <Defs>
        <LinearGradient id="meninaBg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={kidsPalette.tintPurple} />
          <Stop offset="1" stopColor={kidsPalette.purple} />
        </LinearGradient>
      </Defs>
      <Circle cx={100} cy={100} r={100} fill="url(#meninaBg)" />

      <Path d="M58,192 C58,142 142,142 142,192 Z" fill={kidsPalette.pink} />
      <Circle cx={100} cy={108} r={34} fill="#8B5A3C" />
      <Path
        d="M64,104 C58,68 84,54 100,54 C118,54 142,68 136,104 C136,84 128,74 118,72 C112,86 88,86 82,72 C72,74 64,84 64,104 Z"
        fill="#2B2118"
      />
      <Circle cx={90} cy={110} r={3.4} fill="#20140D" />
      <Circle cx={110} cy={110} r={3.4} fill="#20140D" />
      <Path d="M92,122 C96,126 104,126 108,122" stroke="#20140D" strokeWidth={2.4} fill="none" strokeLinecap="round" />

      {/* Bíblia junto ao peito */}
      <Path d="M78,150 L122,150 L122,178 L100,172 L78,178 Z" fill={kidsPalette.tintYellow} stroke={kidsPalette.yellowDeep} strokeWidth={1.5} />
      <Path d="M100,150 L100,172" stroke={kidsPalette.yellowDeep} strokeWidth={1.5} />
    </Svg>
  );
}
