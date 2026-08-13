import React from 'react';
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { kidsPalette } from '../../../theme/kidsPalette';

type Props = { width?: number | string; height?: number | string };

/**
 * Menino em contexto bíblico (segurando um pergaminho/rolo) — representa a
 * faixa etária 6 a 9 anos.
 */
export function MeninoIllustration({ width = '100%', height = '100%' }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
      <Defs>
        <LinearGradient id="meninoBg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={kidsPalette.tintGreen} />
          <Stop offset="1" stopColor={kidsPalette.green} />
        </LinearGradient>
      </Defs>
      <Circle cx={100} cy={100} r={100} fill="url(#meninoBg)" />

      <Path d="M60,190 C60,140 140,140 140,190 Z" fill={kidsPalette.blue} />
      <Circle cx={100} cy={110} r={34} fill="#C98857" />
      <Path
        d="M68,108 C64,80 84,62 100,62 C116,62 136,80 132,108 C126,96 118,100 100,100 C82,100 74,96 68,108 Z"
        fill="#3B2A1D"
      />
      <Circle cx={90} cy={112} r={3.4} fill="#2B2118" />
      <Circle cx={110} cy={112} r={3.4} fill="#2B2118" />
      <Path d="M92,124 C96,128 104,128 108,124" stroke="#2B2118" strokeWidth={2.4} fill="none" strokeLinecap="round" />

      {/* Rolo / pergaminho */}
      <Path d="M60,148 C74,142 126,142 140,148 L140,160 C126,154 74,154 60,160 Z" fill={kidsPalette.tintYellow} stroke={kidsPalette.yellowDeep} strokeWidth={1.5} />
    </Svg>
  );
}
