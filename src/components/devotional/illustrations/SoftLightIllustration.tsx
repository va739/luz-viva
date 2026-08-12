import React from 'react';
import Svg, { Circle, Defs, LinearGradient, Path, RadialGradient, Rect, Stop } from 'react-native-svg';
import { colors } from '../../../theme';

type Props = {
  width?: number | string;
  height?: number | string;
};

/**
 * Ilustração autoral do Luz Viva: composição contemplativa e minimalista de
 * luz suave, usada como fundo para o momento de citação — atmosférica por
 * intenção, para não competir com o texto sobreposto.
 */
export function SoftLightIllustration({ width = '100%', height = '100%' }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <Defs>
        <LinearGradient id="softLightBg" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={colors.navy900} />
          <Stop offset="0.6" stopColor={colors.navy800} />
          <Stop offset="1" stopColor={colors.navy700} />
        </LinearGradient>
        <RadialGradient id="softLightGlow" cx="0.5" cy="0.28" r="0.55">
          <Stop offset="0" stopColor={colors.gold400} stopOpacity={0.55} />
          <Stop offset="1" stopColor={colors.gold400} stopOpacity={0} />
        </RadialGradient>
      </Defs>

      <Rect x={0} y={0} width={400} height={300} fill="url(#softLightBg)" />
      <Rect x={0} y={0} width={400} height={300} fill="url(#softLightGlow)" />

      <Path d="M200,10 L182,150 L200,290 L218,150 Z" fill={colors.gold400} opacity={0.08} />
      <Path d="M200,10 L120,160 L200,290 L150,150 Z" fill={colors.gold400} opacity={0.05} />
      <Path d="M200,10 L280,160 L200,290 L250,150 Z" fill={colors.gold400} opacity={0.05} />

      <Circle cx={90} cy={70} r={1.6} fill={colors.cream100} opacity={0.5} />
      <Circle cx={320} cy={100} r={1.4} fill={colors.cream100} opacity={0.4} />
      <Circle cx={60} cy={190} r={1.4} fill={colors.cream100} opacity={0.35} />
      <Circle cx={340} cy={210} r={1.8} fill={colors.cream100} opacity={0.45} />
      <Circle cx={250} cy={60} r={1.2} fill={colors.cream100} opacity={0.4} />
    </Svg>
  );
}
