import { Platform } from 'react-native';
import { colors } from './colors';

/**
 * Sombras suaves e consistentes. iOS/Android usam shadow(Color/Offset/Opacity/Radius) + elevation,
 * Web usa boxShadow — Platform.select garante o mesmo efeito visual nas 3 plataformas.
 */
export const shadows = {
  card: Platform.select({
    web: { boxShadow: `0 8px 24px ${colors.shadow}` },
    default: {
      shadowColor: colors.navy900,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 20,
      elevation: 6,
    },
  }),
  floating: Platform.select({
    web: { boxShadow: `0 4px 14px ${colors.shadow}` },
    default: {
      shadowColor: colors.navy900,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 4,
    },
  }),
} as const;
