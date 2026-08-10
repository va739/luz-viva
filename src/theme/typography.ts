/**
 * Sistema tipográfico do Luz Viva.
 * Playfair Display (serifada) para identidade/títulos elegantes.
 * Inter (sem serifa) para textos de leitura, por ser altamente legível.
 */
export const fontFamilies = {
  serifRegular: 'PlayfairDisplay_400Regular',
  serifMedium: 'PlayfairDisplay_500Medium',
  serifSemiBold: 'PlayfairDisplay_600SemiBold',
  serifBold: 'PlayfairDisplay_700Bold',
  sansRegular: 'Inter_400Regular',
  sansMedium: 'Inter_500Medium',
  sansSemiBold: 'Inter_600SemiBold',
  sansBold: 'Inter_700Bold',
} as const;

export const typography = {
  logo: {
    fontFamily: fontFamilies.serifBold,
    fontSize: 40,
    lineHeight: 46,
  },
  logoTagline: {
    fontFamily: fontFamilies.sansMedium,
    fontSize: 13,
    letterSpacing: 3,
  },
  h1: {
    fontFamily: fontFamilies.serifSemiBold,
    fontSize: 26,
    lineHeight: 32,
  },
  h2: {
    fontFamily: fontFamilies.serifSemiBold,
    fontSize: 20,
    lineHeight: 26,
  },
  h3: {
    fontFamily: fontFamilies.sansSemiBold,
    fontSize: 17,
    lineHeight: 22,
  },
  body: {
    fontFamily: fontFamilies.sansRegular,
    fontSize: 15,
    lineHeight: 22,
  },
  bodyMedium: {
    fontFamily: fontFamilies.sansMedium,
    fontSize: 15,
    lineHeight: 22,
  },
  caption: {
    fontFamily: fontFamilies.sansRegular,
    fontSize: 13,
    lineHeight: 18,
  },
  label: {
    fontFamily: fontFamilies.sansSemiBold,
    fontSize: 12,
    letterSpacing: 1.2,
  },
  verse: {
    fontFamily: fontFamilies.serifMedium,
    fontSize: 20,
    lineHeight: 30,
  },
} as const;
