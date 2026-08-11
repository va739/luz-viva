import React, { ReactNode, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../theme';

type Props = {
  title: string;
  children: ReactNode;
  isLast?: boolean;
  defaultOpen?: boolean;
};

/**
 * Seção expansível (accordion) genérica — usada no Guia do Jejum e pronta
 * para reaproveitamento em outras áreas de conteúdo longo (ex.: FAQ, notas
 * de estudo da Bíblia).
 */
export function ExpandableSection({ title, children, isLast = false, defaultOpen = false }: Props) {
  const [aberto, setAberto] = useState(defaultOpen);

  return (
    <View style={!isLast && styles.divider}>
      <Pressable onPress={() => setAberto((valor) => !valor)} style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <MaterialCommunityIcons
          name={aberto ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={colors.ink400}
        />
      </Pressable>
      {aberto && <View style={styles.body}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
  },
  title: {
    ...typography.bodyMedium,
    color: colors.ink900,
    flex: 1,
    marginRight: spacing.md,
  },
  body: {
    paddingBottom: spacing.lg,
  },
});
