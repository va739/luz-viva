import React, { PropsWithChildren } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors, radii, shadows, spacing } from '../theme';

type Props = PropsWithChildren<{
  style?: ViewStyle;
  variant?: 'light' | 'dark';
  padded?: boolean;
}>;

/**
 * Card base com cantos arredondados e sombra suave, usado como fundação
 * visual para todos os cards do app (versículo, citação, atalhos, progresso).
 */
export function Card({ children, style, variant = 'light', padded = true }: Props) {
  return (
    <View
      style={[
        styles.base,
        variant === 'dark' ? styles.dark : styles.light,
        padded && styles.padded,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.lg,
    ...shadows.card,
  },
  light: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dark: {
    backgroundColor: colors.navy800,
  },
  padded: {
    padding: spacing.xl,
  },
});
