import React, { ReactNode, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../theme';
import { Card } from './Card';

type Props = {
  title: string;
  subtitle: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

/**
 * Card de nível de página com resumo (título + subtítulo) que expande para
 * revelar o conteúdo completo ao ser tocado. Usado para organizar seções
 * longas (Oração, Reflexão, Guia do Jejum...) sem deixar a tela com tudo
 * aberto de uma vez. Distinto de ExpandableSection, que é a variação mais
 * simples (linha de lista, sem elevação própria) usada dentro dessas seções.
 */
export function ExpandableCard({ title, subtitle, children, defaultOpen = false }: Props) {
  const [aberto, setAberto] = useState(defaultOpen);

  return (
    <Card style={styles.card}>
      <Pressable onPress={() => setAberto((valor) => !valor)} style={styles.header}>
        <View style={styles.textWrap}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <MaterialCommunityIcons
          name={aberto ? 'chevron-up' : 'chevron-down'}
          size={22}
          color={colors.ink400}
        />
      </Pressable>
      {aberto && <View style={styles.body}>{children}</View>}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textWrap: {
    flex: 1,
    marginRight: spacing.md,
  },
  title: {
    ...typography.h3,
    color: colors.ink900,
    marginBottom: 2,
  },
  subtitle: {
    ...typography.caption,
    color: colors.ink600,
  },
  body: {
    marginTop: spacing.lg,
  },
});
