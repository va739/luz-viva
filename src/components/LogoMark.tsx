import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  size?: number;
  color?: string;
  secondaryOpacity?: number;
};

/**
 * Símbolo oficial do Luz Viva: um broto de duas lâminas assimétricas,
 * desenhado à mão (não é um ícone genérico de biblioteca).
 * Usado no logo, na saudação da Home e em qualquer elemento botânico
 * que precise reforçar a identidade da marca.
 */
export function LogoMark({ size = 24, color = '#C6A15B', secondaryOpacity = 0.7 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Lâmina esquerda, mais curta — camada de trás */}
      <Path
        d="M49 93 C34 85 23 68 26 45 C28 33 33 23 39 14 C42 30 44 46 45 62 C45.7 72.5 47 83 49 93 Z"
        fill={color}
        opacity={secondaryOpacity}
      />
      {/* Lâmina direita, mais alta — camada da frente */}
      <Path d="M50 93 C64 84 74 65 72 41 C71 28 66 17 60 7 C57 25 54 43 52 61 C51.2 72 50.4 82.5 50 93 Z" fill={color} />
    </Svg>
  );
}
