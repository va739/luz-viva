import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { kidsPalette } from '../../../theme/kidsPalette';

type Props = { width?: number | string; height?: number | string };

/** Notas musicais — ilustração do atalho "Música e Louvores". */
export function MusicaIllustration({ width = '100%', height = '100%' }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 100 100">
      <Circle cx={50} cy={50} r={50} fill={kidsPalette.tintRed} />
      <Path d="M40,64 L40,34 L64,28 L64,58" stroke={kidsPalette.red} strokeWidth={3} fill="none" strokeLinecap="round" />
      <Circle cx={35} cy={66} r={7} fill={kidsPalette.red} />
      <Circle cx={59} cy={60} r={7} fill={kidsPalette.red} />
    </Svg>
  );
}
