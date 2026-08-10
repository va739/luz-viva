import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScreenContainer } from '../components';
import { colors, radii, shadows, spacing, typography } from '../theme';
import { BibliaStackParamList } from '../navigation/types';
import { obterLivro } from '../data/bibleBooks';

type Navigation = NativeStackNavigationProp<BibliaStackParamList, 'Capitulos'>;
type Rota = RouteProp<BibliaStackParamList, 'Capitulos'>;

export function BibliaCapitulosScreen() {
  const navigation = useNavigation<Navigation>();
  const { params } = useRoute<Rota>();
  const livro = obterLivro(params.livroId);

  if (!livro) {
    return (
      <ScreenContainer>
        <Text style={styles.notFound}>Livro não encontrado.</Text>
      </ScreenContainer>
    );
  }

  const capitulos = Array.from({ length: livro.capitulos }, (_, index) => index + 1);

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
          <MaterialCommunityIcons name="chevron-left" size={24} color={colors.navy700} />
        </Pressable>
      </View>

      <Text style={styles.title}>{livro.nome}</Text>
      <Text style={styles.subtitle}>Selecione um capítulo para ler</Text>

      <View style={styles.grid}>
        {capitulos.map((capitulo) => (
          <Pressable
            key={capitulo}
            style={({ pressed }) => [styles.chapterButton, pressed && styles.chapterButtonPressed]}
            onPress={() => navigation.navigate('Leitura', { livroId: livro.id, capitulo })}
          >
            <Text style={styles.chapterLabel}>{capitulo}</Text>
            <View style={styles.chapterAccent} />
          </Pressable>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: radii.pill,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    ...typography.h1,
    color: colors.ink900,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.ink600,
    marginBottom: spacing.xxl,
  },
  notFound: {
    ...typography.body,
    color: colors.ink600,
    marginTop: spacing.xxl,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  chapterButton: {
    width: '22%',
    aspectRatio: 1.25,
    borderRadius: radii.xl,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    ...shadows.floating,
  },
  chapterButtonPressed: {
    opacity: 0.6,
  },
  chapterLabel: {
    ...typography.h3,
    fontSize: 18,
    color: colors.navy800,
    marginBottom: spacing.xs,
  },
  chapterAccent: {
    width: 16,
    height: 3,
    borderRadius: radii.pill,
    backgroundColor: colors.gold400,
  },
});
