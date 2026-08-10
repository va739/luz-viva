import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../theme';
import { IconCircle } from './IconCircle';

type Props = {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  label: string;
  iconBackground?: string;
  iconColor?: string;
  onPress?: () => void;
  isLast?: boolean;
};

/**
 * Linha de lista usada no Perfil (e reaproveitável em outras telas de configuração futuras).
 */
export function ListRow({
  icon,
  label,
  iconBackground = colors.cream300,
  iconColor = colors.navy700,
  onPress,
  isLast = false,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, !isLast && styles.divider, pressed && styles.pressed]}
    >
      <IconCircle name={icon} backgroundColor={iconBackground} iconColor={iconColor} size={40} iconSize={19} />
      <Text style={styles.label}>{label}</Text>
      <MaterialCommunityIcons name="chevron-right" size={20} color={colors.ink400} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  pressed: {
    opacity: 0.6,
  },
  label: {
    ...typography.bodyMedium,
    color: colors.ink900,
    flex: 1,
    marginLeft: spacing.md,
  },
});
