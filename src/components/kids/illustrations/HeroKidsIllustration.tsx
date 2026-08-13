import React from 'react';
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { kidsPalette } from '../../../theme/kidsPalette';
import { colors } from '../../../theme';

type Props = {
  width?: number | string;
  height?: number | string;
};

function Crianca({ x, corPele, corRoupa }: { x: number; corPele: string; corRoupa: string }) {
  return (
    <>
      <Path d={`M${x - 20},210 C${x - 20},178 ${x + 20},178 ${x + 20},210 L${x + 20},230 L${x - 20},230 Z`} fill={corRoupa} />
      <Circle cx={x} cy={168} r={22} fill={corPele} />
    </>
  );
}

/**
 * Ilustração autoral do Luz Viva Kids: Jesus sentado com uma Bíblia aberta,
 * rodeado por três crianças, sob uma árvore com um passarinho — composição
 * própria (não copiada de nenhuma referência), pensada para o hero da área
 * Kids. Desenho vetorial simples e alegre, não uma fotografia.
 */
export function HeroKidsIllustration({ width = '100%', height = '100%' }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 400 260" preserveAspectRatio="xMidYMax slice">
      <Defs>
        <LinearGradient id="heroSky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={kidsPalette.sky} />
          <Stop offset="1" stopColor={kidsPalette.tintYellow} />
        </LinearGradient>
      </Defs>

      <Path d="M0,0 H400 V260 H0 Z" fill="url(#heroSky)" />

      <Circle cx={64} cy={54} r={26} fill={kidsPalette.sun} opacity={0.9} />
      <Circle cx={330} cy={40} r={6} fill={colors.white} opacity={0.8} />
      <Circle cx={352} cy={64} r={4} fill={colors.white} opacity={0.7} />
      <Circle cx={312} cy={72} r={3.5} fill={colors.white} opacity={0.7} />

      {/* Árvore à direita */}
      <Path d="M350,260 L350,150" stroke="#8A6240" strokeWidth={10} strokeLinecap="round" />
      <Circle cx={350} cy={110} r={52} fill={kidsPalette.green} />
      <Circle cx={310} cy={130} r={34} fill={kidsPalette.greenDeep} opacity={0.9} />
      <Circle cx={388} cy={128} r={30} fill={kidsPalette.greenDeep} opacity={0.9} />
      {/* Passarinho */}
      <Circle cx={372} cy={96} r={8} fill={kidsPalette.blue} />
      <Path d="M380,96 L390,92 L380,100 Z" fill={kidsPalette.yellow} />

      {/* Colina / grama */}
      <Path d="M0,196 C100,170 300,170 400,200 L400,260 L0,260 Z" fill={kidsPalette.green} />
      <Path d="M0,214 C100,196 300,196 400,220 L400,260 L0,260 Z" fill={kidsPalette.greenDeep} opacity={0.55} />

      {/* Jesus sentado, ao centro, com a Bíblia */}
      <Path d="M175,230 C175,180 225,180 225,230 L225,255 L175,255 Z" fill={colors.white} />
      <Path d="M182,230 C182,196 218,196 218,230" stroke={kidsPalette.blueDeep} strokeWidth={5} fill="none" opacity={0.5} />
      <Circle cx={200} cy={168} r={24} fill="#E7B98C" />
      <Path d="M178,160 C178,140 222,140 222,160 C222,150 210,142 200,142 C190,142 178,150 178,160 Z" fill="#6B4A32" />
      <Path d="M186,214 L214,214 L210,232 L190,232 Z" fill={kidsPalette.tintYellow} stroke={kidsPalette.yellowDeep} strokeWidth={1.5} />

      <Crianca x={110} corPele="#E7B98C" corRoupa={kidsPalette.red} />
      <Crianca x={290} corPele="#C98857" corRoupa={kidsPalette.purple} />
      <Crianca x={250} corPele="#8B5A3C" corRoupa={kidsPalette.orange} />
    </Svg>
  );
}
