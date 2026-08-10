/**
 * Paleta oficial do Luz Viva.
 * Azul profundo como cor de identidade, tons claros/creme como base,
 * dourado usado apenas em pequenos detalhes de destaque.
 */
export const colors = {
  // Azul profundo — cor principal da marca
  navy900: '#0E1B33',
  navy800: '#152A4A',
  navy700: '#1C3660',
  navy600: '#274678',

  // Dourado — apenas para detalhes e destaques pontuais
  gold500: '#C6A15B',
  gold400: '#D4B679',
  gold100: '#F3E7CE',

  // Base clara / creme
  cream100: '#FBF6EC',
  cream200: '#F6EEDD',
  cream300: '#EFE4CC',

  white: '#FFFFFF',

  // Tons neutros de texto
  ink900: '#1B2438',
  ink600: '#4A5468',
  ink400: '#7C859A',
  ink200: '#C7CCD8',

  // Tints suaves usadas nos cards de atalho
  tintPeach: '#F6E4CC',
  tintPeachIcon: '#B8863E',
  tintSage: '#DCE8DD',
  tintSageIcon: '#4C7A5A',
  tintLilac: '#E4E1F2',
  tintLilacIcon: '#5E5A96',

  success: '#4C7A5A',
  overlay: 'rgba(14, 27, 51, 0.45)',
  border: 'rgba(27, 36, 56, 0.08)',
  shadow: 'rgba(14, 27, 51, 0.16)',
} as const;

export type ThemeColors = typeof colors;
