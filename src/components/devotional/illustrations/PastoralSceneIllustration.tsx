import React from 'react';
import Svg, { Circle, Defs, Ellipse, Line, LinearGradient, Path, Stop } from 'react-native-svg';
import { colors } from '../../../theme';

type Props = {
  width?: number | string;
  height?: number | string;
};

function Sheep({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <>
      <Ellipse cx={x} cy={y} rx={10 * scale} ry={6.5 * scale} fill={colors.cream100} opacity={0.92} />
      <Circle cx={x - 10 * scale} cy={y - 2 * scale} r={4 * scale} fill={colors.cream100} opacity={0.92} />
      <Line x1={x - 5 * scale} y1={y + 6 * scale} x2={x - 5 * scale} y2={y + 11 * scale} stroke={colors.navy700} strokeWidth={1.4} opacity={0.5} />
      <Line x1={x + 4 * scale} y1={y + 6 * scale} x2={x + 4 * scale} y2={y + 11 * scale} stroke={colors.navy700} strokeWidth={1.4} opacity={0.5} />
    </>
  );
}

/**
 * Ilustração autoral do Luz Viva: campo pastoral ao amanhecer, com colinas em
 * camadas, ovelhas e um caminho suave. Referência visual para o Salmo 23
 * ("verdes pastos", "guia-me"). Desenhada à mão em SVG (mesmo espírito do
 * LogoMark), não uma fotografia — ver limitação de assets no relatório final.
 */
export function PastoralSceneIllustration({ width = '100%', height = '100%' }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <Defs>
        <LinearGradient id="pastoralSky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={colors.navy800} />
          <Stop offset="0.55" stopColor={colors.navy600} />
          <Stop offset="1" stopColor={colors.gold400} />
        </LinearGradient>
      </Defs>

      <Path d="M0,0 H400 V300 H0 Z" fill="url(#pastoralSky)" />

      <Circle cx={298} cy={92} r={68} fill={colors.gold400} opacity={0.16} />
      <Circle cx={298} cy={92} r={36} fill={colors.gold400} opacity={0.9} />

      <Path
        d="M0,190 C80,158 140,176 200,164 C260,152 320,176 400,158 L400,300 L0,300 Z"
        fill={colors.navy600}
        opacity={0.55}
      />
      <Path
        d="M0,218 C70,196 150,222 220,206 C300,188 350,214 400,198 L400,300 L0,300 Z"
        fill={colors.navy700}
        opacity={0.8}
      />
      <Path
        d="M0,180 C120,235 260,235 400,190 L400,300 L0,300 Z"
        fill={colors.tintSageIcon}
        opacity={0.92}
      />

      <Path
        d="M110,300 C130,255 150,235 176,214"
        stroke={colors.gold400}
        strokeWidth={2}
        strokeDasharray="1,7"
        strokeLinecap="round"
        fill="none"
        opacity={0.55}
      />

      <Sheep x={112} y={252} scale={1.1} />
      <Sheep x={148} y={266} scale={0.9} />
      <Sheep x={252} y={258} scale={1} />
    </Svg>
  );
}
