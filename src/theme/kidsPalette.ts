/**
 * Paleta exclusiva da área Kids — muito mais colorida que o restante do
 * app, de propósito (ver AJUSTE — TELA PRINCIPAL KIDS). Usada apenas pelos
 * arquivos de src/screens/KidsScreen.tsx, src/data/kidsData.ts e
 * src/components/kids/**. O restante do Luz Viva continua usando somente
 * src/theme/colors.ts, sem nenhuma mistura entre as duas paletas.
 */
export const kidsPalette = {
  blue: '#4A90D9',
  blueDeep: '#2F6FB8',
  yellow: '#F5C242',
  yellowDeep: '#E0A82E',
  green: '#6FBF73',
  greenDeep: '#4FA055',
  purple: '#9B7FD4',
  purpleDeep: '#7C5FC4',
  red: '#E8735C',
  orange: '#F2994A',
  pink: '#F2A6C4',
  sky: '#CDEBFA',
  skyDeep: '#8FCBEE',
  sun: '#FFE08A',
  tintBlue: '#E4F0FB',
  tintYellow: '#FDF3DC',
  tintGreen: '#E8F5E8',
  tintPurple: '#EFE9FA',
  tintRed: '#FBE7E3',
} as const;
