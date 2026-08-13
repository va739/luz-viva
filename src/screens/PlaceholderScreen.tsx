import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScreenContainer } from '../components';
import { colors, radii, spacing, typography } from '../theme';

type Props = {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  title: string;
  description: string;
  onBack?: () => void;
};

/**
 * Tela-base para módulos/jornadas ainda não implementados. Mantém a
 * navegação funcional e a identidade visual consistente enquanto cada
 * conteúdo é construído em etapas futuras. `onBack` é opcional: usada
 * quando a tela é empilhada (ex.: placeholders da área Kids); sem ela, a
 * tela assume que já está dentro de uma aba com navegação própria.
 */
export function PlaceholderScreen({ icon, title, description, onBack }: Props) {
  return (
    <ScreenContainer contentStyle={styles.content}>
      {onBack && (
        <Pressable onPress={onBack} style={styles.backButton} hitSlop={10}>
          <MaterialCommunityIcons name="chevron-left" size={22} color={colors.navy700} />
        </Pressable>
      )}
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
  backButton: {
    position: 'absolute',
    top: spacing.lg,
    left: spacing.xl,
    width: 38,
    height: 38,
    borderRadius: radii.pill,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
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
