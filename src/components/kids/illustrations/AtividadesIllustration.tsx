import React from 'react';
import Svg, { Circle } from 'react-native-svg';
import { kidsPalette } from '../../../theme/kidsPalette';
import { colors } from '../../../theme';

type Props = { width?: number | string; height?: number | string };

/** Paleta de tintas — ilustração do atalho "Atividades e Desenhos". */
export function AtividadesIllustration({ width = '100%', height = '100%' }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 100 100">
      <Circle cx={50} cy={50} r={50} fill={kidsPalette.tintYellow} />
      <Circle cx={50} cy={50} r={24} fill={colors.white} stroke={kidsPalette.yellowDeep} strokeWidth={2} />
      <Circle cx={40} cy={40} r={5} fill={kidsPalette.red} />
      <Circle cx={60} cy={40} r={5} fill={kidsPalette.blue} />
      <Circle cx={64} cy={56} r={5} fill={kidsPalette.green} />
      <Circle cx={48} cy={62} r={5} fill={kidsPalette.purple} />
      <Circle cx={36} cy={54} r={5} fill={kidsPalette.orange} />
    </Svg>
  );
}
