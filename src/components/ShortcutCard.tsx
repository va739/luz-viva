import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { radii, shadows, spacing, typography } from '../theme';

type Props = {
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  customIcon?: React.ReactNode;
  title: string;
  subtitle: string;
  backgroundColor: string;
  iconColor: string;
  onPress?: () => void;
};

/**
 * Atalho usado na Home ("Devocional", "Oração", "Citação"...).
 * Cada instância recebe suas próprias cores de tint, mantendo o mesmo formato.
 * `customIcon` permite usar um símbolo próprio da marca (ex.: LogoMark) em vez
 * de um ícone genérico de biblioteca.
 */
export function ShortcutCard({ icon, customIcon, title, subtitle, backgroundColor, iconColor, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, { backgroundColor }, pressed && styles.pressed]}
    >
      <View style={styles.iconWrap}>
        {customIcon ?? (icon && <MaterialCommunityIcons name={icon} size={20} color={iconColor} />)}
      </View>
      <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
        {title}
      </Text>
      <Text style={styles.subtitle} numberOfLines={2}>
        {subtitle}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: radii.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    minHeight: 132,
    ...shadows.floating,
  },
  pressed: {
    opacity: 0.85,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255,255,255,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h3,
    fontSize: 14,
    lineHeight: 18,
    color: '#26324A',
    marginBottom: 2,
  },
  subtitle: {
    ...typography.caption,
    fontSize: 11.5,
    lineHeight: 15,
    color: '#4A5468',
  },
});
