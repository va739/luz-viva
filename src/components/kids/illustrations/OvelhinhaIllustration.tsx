import React from 'react';
import Svg, { Circle, Defs, Ellipse, LinearGradient, Stop } from 'react-native-svg';
import { kidsPalette } from '../../../theme/kidsPalette';
import { colors } from '../../../theme';

type Props = { width?: number | string; height?: number | string };

/**
 * Ovelhinha ilustrada de forma amigável — representa a faixa etária 2 a 5
 * anos. Traço simples e redondo, adequado para os menores.
 */
export function OvelhinhaIllustration({ width = '100%', height = '100%' }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
      <Defs>
        <LinearGradient id="ovelhaBg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={kidsPalette.tintYellow} />
          <Stop offset="1" stopColor={kidsPalette.sun} />
        </LinearGradient>
      </Defs>
      <Circle cx={100} cy={100} r={100} fill="url(#ovelhaBg)" />

      <Ellipse cx={72} cy={112} rx={16} ry={14} fill={kidsPalette.tintYellow} />
      <Ellipse cx={128} cy={112} rx={16} ry={14} fill={kidsPalette.tintYellow} />
      <Ellipse cx={100} cy={108} rx={38} ry={30} fill={colors.white} />
      <Circle cx={78} cy={98} r={16} fill={colors.white} />
      <Circle cx={122} cy={98} r={16} fill={colors.white} />
      <Circle cx={100} cy={92} r={16} fill={colors.white} />

      <Ellipse cx={100} cy={122} rx={22} ry={20} fill="#7A5C3E" />
      <Circle cx={92} cy={116} r={3.2} fill="#2B2118" />
      <Circle cx={108} cy={116} r={3.2} fill="#2B2118" />
      <Ellipse cx={100} cy={128} rx={4} ry={3} fill="#2B2118" />

      <Ellipse cx={78} cy={98} rx={10} ry={13} fill="#7A5C3E" opacity={0.85} />
      <Ellipse cx={122} cy={98} rx={10} ry={13} fill="#7A5C3E" opacity={0.85} />
    </Svg>
  );
}
