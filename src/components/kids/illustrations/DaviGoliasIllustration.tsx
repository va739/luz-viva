import React from 'react';
import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { kidsPalette } from '../../../theme/kidsPalette';

type Props = { width?: number | string; height?: number | string };

/** Davi e Golias — ilustração autoral para o carrossel "Continue aprendendo". */
export function DaviGoliasIllustration({ width = '100%', height = '100%' }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice">
      <Defs>
        <LinearGradient id="dgBg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={kidsPalette.tintYellow} />
          <Stop offset="1" stopColor={kidsPalette.orange} />
        </LinearGradient>
      </Defs>
      <Rect x={0} y={0} width={200} height={140} fill="url(#dgBg)" />
      <Path d="M0,116 C60,104 140,104 200,118 L200,140 L0,140 Z" fill={kidsPalette.green} />

      {/* Golias, grande, ao fundo */}
      <Rect x={122} y={40} width={26} height={64} rx={6} fill="#8A8F98" />
      <Circle cx={135} cy={32} r={16} fill="#C98857" />
      <Rect x={126} y={22} width={18} height={8} rx={2} fill="#5B6068" />

      {/* Davi, pequeno, em primeiro plano */}
      <Path d="M52,116 C52,96 78,96 78,116 L78,124 L52,124 Z" fill={kidsPalette.blue} />
      <Circle cx={65} cy={86} r={14} fill="#E7B98C" />
      <Path d="M52,84 C52,72 78,72 78,84" stroke="#6B4A32" strokeWidth={5} fill="none" />
      <Path d="M40,96 L28,74" stroke="#C98857" strokeWidth={4} strokeLinecap="round" />
      <Circle cx={26} cy={70} r={3.4} fill={kidsPalette.red} />
    </Svg>
  );
}
