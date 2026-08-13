import React from 'react';
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { kidsPalette } from '../../../theme/kidsPalette';

type Props = { width?: number | string; height?: number | string };

/**
 * Adolescente em contexto de estudo/aprendizado bíblico — representa a
 * faixa etária 13 anos ou mais.
 */
export function AdolescenteIllustration({ width = '100%', height = '100%' }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
      <Defs>
        <LinearGradient id="adoBg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={kidsPalette.tintRed} />
          <Stop offset="1" stopColor={kidsPalette.red} />
        </LinearGradient>
      </Defs>
      <Circle cx={100} cy={100} r={100} fill="url(#adoBg)" />

      <Path d="M56,192 C56,138 144,138 144,192 Z" fill={kidsPalette.blueDeep} />
      <Circle cx={100} cy={106} r={35} fill="#A9724A" />
      <Path
        d="M62,100 C58,66 82,50 100,50 C118,50 142,66 138,100 C132,90 128,78 124,74 C120,86 80,86 76,74 C72,78 68,90 62,100 Z"
        fill="#1E140D"
      />
      <Circle cx={89} cy={110} r={3.4} fill="#1A1109" />
      <Circle cx={111} cy={110} r={3.4} fill="#1A1109" />
      <Path d="M91,122 C96,127 104,127 109,122" stroke="#1A1109" strokeWidth={2.4} fill="none" strokeLinecap="round" />

      {/* Livro/caderno de estudo */}
      <Path d="M70,150 L130,150 L130,176 L100,168 L70,176 Z" fill={kidsPalette.tintYellow} stroke={kidsPalette.yellowDeep} strokeWidth={1.5} />
    </Svg>
  );
}
