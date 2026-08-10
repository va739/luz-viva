import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card, ListRow, ScreenContainer } from '../components';
import { colors, radii, spacing, typography } from '../theme';

// Etapa 1: usuário mockado. Substituído pelo módulo de autenticação.
const usuario = { nome: 'Mariana Silva', email: 'mariana@email.com' };

type Grupo = {
  titulo: string;
  itens: {
    icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
    label: string;
  }[];
};

const grupos: Grupo[] = [
  {
    titulo: 'Minha jornada',
    itens: [
      { icon: 'heart-outline', label: 'Favoritos' },
      { icon: 'notebook-outline', label: 'Anotações' },
      { icon: 'hands-pray', label: 'Pedidos de oração' },
      { icon: 'map-marker-path', label: 'Jornada' },
    ],
  },
  {
    titulo: 'Preferências',
    itens: [
      { icon: 'bell-outline', label: 'Notificações' },
      { icon: 'palette-outline', label: 'Aparência' },
      { icon: 'translate', label: 'Idioma' },
      { icon: 'volume-high', label: 'Áudio' },
    ],
  },
  {
    titulo: 'Outros',
    itens: [
      { icon: 'cog-outline', label: 'Configurações' },
      { icon: 'help-circle-outline', label: 'Suporte' },
    ],
  },
];

export function PerfilScreen() {
  return (
    <ScreenContainer>
      <Text style={styles.screenTitle}>Perfil</Text>

      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarInitial}>{usuario.nome.charAt(0)}</Text>
        </View>
        <View>
          <Text style={styles.name}>{usuario.nome}</Text>
          <Text style={styles.email}>{usuario.email}</Text>
        </View>
      </View>

      {grupos.map((grupo) => (
        <View key={grupo.titulo} style={styles.group}>
          <Text style={styles.groupTitle}>{grupo.titulo}</Text>
          <Card padded={false} style={styles.groupCard}>
            <View style={styles.groupInner}>
              {grupo.itens.map((item, index) => (
                <ListRow
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  isLast={index === grupo.itens.length - 1}
                />
              ))}
            </View>
          </Card>
        </View>
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screenTitle: {
    ...typography.h1,
    color: colors.ink900,
    paddingTop: spacing.lg,
    marginBottom: spacing.xxl,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: radii.pill,
    backgroundColor: colors.navy800,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
  },
  avatarInitial: {
    ...typography.h1,
    color: colors.gold400,
  },
  name: {
    ...typography.h3,
    color: colors.ink900,
    marginBottom: 2,
  },
  email: {
    ...typography.caption,
    color: colors.ink600,
  },
  group: {
    marginBottom: spacing.xxl,
  },
  groupTitle: {
    ...typography.label,
    color: colors.ink400,
    marginBottom: spacing.md,
  },
  groupCard: {
    overflow: 'hidden',
  },
  groupInner: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
  },
});
