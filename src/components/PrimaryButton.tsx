import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, radii, spacing, typography } from '../theme';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: 'solid' | 'outline';
};

export function PrimaryButton({ label, onPress, variant = 'solid' }: Props) {
  const isOutline = variant === 'outline';
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        isOutline ? styles.outline : styles.solid,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.label, isOutline && styles.outlineLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.pill,
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  solid: {
    backgroundColor: colors.navy800,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.navy800,
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    ...typography.bodyMedium,
    color: colors.white,
  },
  outlineLabel: {
    color: colors.navy800,
  },
});
