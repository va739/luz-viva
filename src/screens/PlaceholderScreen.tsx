import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScreenContainer } from '../components';
import { colors, radii, spacing, typography } from '../theme';

type Props = {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  title: string;
  description: string;
};

/**
 * Tela-base para módulos ainda não implementados (Bíblia, Oração, Jejum).
 * Mantém a navegação funcional e a identidade visual consistente enquanto
 * cada módulo é construído em etapas futuras.
 */
export function PlaceholderScreen({ icon, title, description }: Props) {
  return (
    <ScreenContainer contentStyle={styles.content}>
      <View style={styles.iconWrap}>
        <MaterialCommunityIcons name={icon} size={30} color={colors.navy700} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Em breve</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxxl,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: radii.pill,
    backgroundColor: colors.cream300,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h2,
    color: colors.ink900,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  description: {
    ...typography.body,
    color: colors.ink600,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  badge: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.pill,
    backgroundColor: colors.gold100,
  },
  badgeText: {
    ...typography.label,
    color: colors.gold500,
  },
});
