import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

type Props = {
  size?: number;
  color?: string;
};

/**
 * Símbolo minimalista de "criança" para o módulo Kids: rosto em linha fina
 * com uma mecha de cabelo, sem usar emoji nem ícone genérico de biblioteca.
 * Mantém o mesmo traço delicado dos demais elementos da identidade.
 */
export function KidsMark({ size = 22, color = '#1C3660' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <Circle cx={50} cy={58} r={30} stroke={color} strokeWidth={6} />
      <Path
        d="M40 24 C44 10 56 10 60 24"
        stroke={color}
        strokeWidth={6}
        strokeLinecap="round"
        fill="none"
      />
      <Circle cx={39} cy={55} r={4.2} fill={color} />
      <Circle cx={61} cy={55} r={4.2} fill={color} />
      <Path
        d="M37 68 C43 78 57 78 63 68"
        stroke={color}
        strokeWidth={6}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}
