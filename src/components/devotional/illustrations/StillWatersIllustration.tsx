import React from 'react';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { colors } from '../../../theme';

type Props = {
  width?: number | string;
  height?: number | string;
};

/**
 * Ilustração autoral do Luz Viva: águas tranquilas ao entardecer, com reflexo
 * suave da luz. Referência visual para "guia-me mansamente a águas
 * tranquilas" (Salmos 23:2) e para os temas de descanso e restauração.
 */
export function StillWatersIllustration({ width = '100%', height = '100%' }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <Defs>
        <LinearGradient id="watersSky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={colors.navy700} />
          <Stop offset="1" stopColor={colors.gold400} />
        </LinearGradient>
        <LinearGradient id="watersLake" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={colors.gold400} />
          <Stop offset="0.4" stopColor={colors.navy600} />
          <Stop offset="1" stopColor={colors.navy800} />
        </LinearGradient>
      </Defs>

      <Rect x={0} y={0} width={400} height={150} fill="url(#watersSky)" />
      <Path d="M0,140 C100,150 300,150 400,140 L400,150 L0,150 Z" fill={colors.tintSageIcon} opacity={0.5} />

      <Rect x={0} y={150} width={400} height={150} fill="url(#watersLake)" />

      <Path d="M40,168 C120,164 180,172 260,166 C310,162 360,168 400,164" stroke={colors.gold400} strokeWidth={2} fill="none" opacity={0.35} />
      <Path d="M0,190 C70,184 160,194 240,188 C300,183 350,190 400,186" stroke={colors.gold400} strokeWidth={1.6} fill="none" opacity={0.3} />
      <Path d="M20,214 C100,208 200,218 300,212 C340,209 370,213 400,210" stroke={colors.cream100} strokeWidth={1.4} fill="none" opacity={0.22} />
      <Path d="M0,240 C90,234 220,244 320,238 C350,236 380,240 400,238" stroke={colors.gold400} strokeWidth={1.4} fill="none" opacity={0.2} />

      <Path
        d="M-10,300 C10,268 22,254 18,232 M18,232 C24,238 30,236 34,228 M18,232 C10,236 4,232 2,224"
        stroke={colors.navy900}
        strokeWidth={2}
        fill="none"
        opacity={0.55}
        strokeLinecap="round"
      />
    </Svg>
  );
}
