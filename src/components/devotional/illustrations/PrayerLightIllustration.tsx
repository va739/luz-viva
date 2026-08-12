import React from 'react';
import Svg, { Defs, LinearGradient, Path, RadialGradient, Rect, Stop } from 'react-native-svg';
import { colors } from '../../../theme';

type Props = {
  width?: number | string;
  height?: number | string;
};

/**
 * Ilustração autoral do Luz Viva: mãos em oração sob uma luz suave, usada na
 * etapa de Oração. Silhueta minimalista desenhada em SVG, no mesmo espírito
 * do LogoMark (não uma fotografia).
 */
export function PrayerLightIllustration({ width = '100%', height = '100%' }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <Defs>
        <LinearGradient id="prayerBg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={colors.navy800} />
          <Stop offset="1" stopColor={colors.gold500} />
        </LinearGradient>
        <RadialGradient id="prayerGlow" cx="0.5" cy="0.32" r="0.5">
          <Stop offset="0" stopColor={colors.cream100} stopOpacity={0.65} />
          <Stop offset="1" stopColor={colors.cream100} stopOpacity={0} />
        </RadialGradient>
      </Defs>

      <Rect x={0} y={0} width={400} height={300} fill="url(#prayerBg)" />
      <Rect x={0} y={0} width={400} height={300} fill="url(#prayerGlow)" />

      <Path
        d="M200,120
           C196,150 196,178 200,206
           C176,206 168,186 170,158
           C171,140 178,124 188,114
           C182,132 182,150 186,166"
        fill={colors.navy900}
        opacity={0.82}
      />
      <Path
        d="M200,120
           C204,150 204,178 200,206
           C224,206 232,186 230,158
           C229,140 222,124 212,114
           C218,132 218,150 214,166"
        fill={colors.navy900}
        opacity={0.82}
      />

      <Path
        d="M170,206 C182,216 218,216 230,206 L226,224 C212,232 188,232 174,224 Z"
        fill={colors.navy900}
        opacity={0.82}
      />
    </Svg>
  );
}
