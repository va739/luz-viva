import React from 'react';
import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { kidsPalette } from '../../../theme/kidsPalette';
import { colors } from '../../../theme';

type Props = { width?: number | string; height?: number | string };

/**
 * Ilustração autoral do Luz Viva Kids: a Arca de Noé sobre a água, com
 * animais e um arco-íris — composição própria, alegre e infantil.
 */
export function NoeArcaIllustration({ width = '100%', height = '100%' }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">
      <Defs>
        <LinearGradient id="noeSky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={kidsPalette.sky} />
          <Stop offset="1" stopColor={kidsPalette.tintBlue} />
        </LinearGradient>
        <LinearGradient id="noeAgua" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={kidsPalette.blue} />
          <Stop offset="1" stopColor={kidsPalette.blueDeep} />
        </LinearGradient>
      </Defs>

      <Rect x={0} y={0} width={400} height={260} fill="url(#noeSky)" />

      {/* Arco-íris */}
      <Path d="M40,190 A160,160 0 0,1 360,190" stroke={kidsPalette.red} strokeWidth={9} fill="none" opacity={0.85} />
      <Path d="M58,190 A142,142 0 0,1 342,190" stroke={kidsPalette.orange} strokeWidth={9} fill="none" opacity={0.85} />
      <Path d="M76,190 A124,124 0 0,1 324,190" stroke={kidsPalette.yellow} strokeWidth={9} fill="none" opacity={0.85} />
      <Path d="M94,190 A106,106 0 0,1 306,190" stroke={kidsPalette.green} strokeWidth={9} fill="none" opacity={0.85} />
      <Path d="M112,190 A88,88 0 0,1 288,190" stroke={kidsPalette.blue} strokeWidth={9} fill="none" opacity={0.85} />
      <Path d="M130,190 A70,70 0 0,1 270,190" stroke={kidsPalette.purple} strokeWidth={9} fill="none" opacity={0.85} />

      <Circle cx={70} cy={44} r={5} fill={colors.white} opacity={0.85} />
      <Circle cx={92} cy={60} r={3.5} fill={colors.white} opacity={0.75} />

      <Rect x={0} y={190} width={400} height={70} fill="url(#noeAgua)" />
      <Path d="M0,200 C60,194 100,206 160,200 C220,194 260,206 320,200 C350,197 380,201 400,199" stroke={colors.white} strokeWidth={2} opacity={0.35} fill="none" />

      {/* Casco da arca */}
      <Path d="M120,206 L280,206 L262,232 L138,232 Z" fill="#A9713F" />
      <Path d="M120,206 L280,206 L280,196 L120,196 Z" fill="#8A5A31" />
      {/* Cabine */}
      <Rect x={150} y={162} width={100} height={38} rx={8} fill="#C08A54" />
      <Path d="M150,162 C150,146 250,146 250,162 Z" fill="#8A5A31" />
      <Rect x={168} y={174} width={16} height={16} rx={3} fill={kidsPalette.tintYellow} />
      <Rect x={192} y={174} width={16} height={16} rx={3} fill={kidsPalette.tintYellow} />
      <Rect x={216} y={174} width={16} height={16} rx={3} fill={kidsPalette.tintYellow} />

      {/* Girafa */}
      <Path d="M292,232 L292,178" stroke={kidsPalette.yellow} strokeWidth={8} strokeLinecap="round" />
      <Circle cx={292} cy={172} r={11} fill={kidsPalette.yellow} />
      <Circle cx={288} cy={169} r={1.6} fill="#3B2A1D" />
      <Circle cx={296} cy={169} r={1.6} fill="#3B2A1D" />

      {/* Elefante */}
      <Circle cx={140} cy={222} r={18} fill={kidsPalette.purple} opacity={0.85} />
      <Path d="M128,224 C122,232 122,240 128,244" stroke={kidsPalette.purple} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.85} />
      <Circle cx={134} cy={216} r={2} fill="#2B2118" />
    </Svg>
  );
}
