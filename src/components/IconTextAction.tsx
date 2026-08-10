import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { spacing, typography } from '../theme';

type Props = {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  label: string;
  color: string;
  onPress?: () => void;
};

/**
 * Ação com ícone + texto usada em cards (ex.: Salvar, Compartilhar, Ouvir).
 */
export function IconTextAction({ icon, label, color, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.pressed]} hitSlop={6}>
      <MaterialCommunityIcons name={icon} size={17} color={color} style={styles.icon} />
      <Text style={[styles.label, { color }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: spacing.xs,
  },
  label: {
    ...typography.bodyMedium,
  },
  pressed: {
    opacity: 0.7,
  },
});
