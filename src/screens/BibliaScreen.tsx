import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card, ProgressBar, ScreenContainer, SearchField, SectionHeader } from '../components';
import { colors, radii, spacing, typography } from '../theme';
import { BibliaStackParamList } from '../navigation/types';
import { Livro, Testamento, livrosBiblia } from '../data/bibleBooks';
import { leituraAtual } from '../data/bibleText';
import { versaoPadrao } from '../data/bibleVersions';

type Navigation = NativeStackNavigationProp<BibliaStackParamList, 'BibliaHome'>;

function normalizar(texto: string) {
  // Remove acentos comparando por código Unicode (evita ambiguidade de regex com marcas combinantes).
  return texto
    .toLowerCase()
    .normalize('NFD')
    .split('')
    .filter((char) => {
      const code = char.charCodeAt(0);
      return code < 0x0300 || code > 0x036f;
    })
    .join('');
}

export function BibliaScreen() {
  const navigation = useNavigation<Navigation>();
  const [busca, setBusca] = useState('');
  const [testamentoAtivo, setTestamentoAtivo] = useState<Testamento>('antigo');

  const livrosFiltrados = useMemo(() => {
    const doTestamento = livrosBiblia.filter((livro) => livro.testamento === testamentoAtivo);
    if (!busca.trim()) return doTestamento;
    const termo = normalizar(busca);
    return doTestamento.filter((livro) => normalizar(livro.nome).includes(termo));
  }, [busca, testamentoAtivo]);

  const abrirLivro = (livroId: string) => {
    navigation.navigate('Capitulos', { livroId });
  };

  const continuarLeitura = () => {
    navigation.navigate('Leitura', { livroId: leituraAtual.livroId, capitulo: leituraAtual.capitulo });
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Bíblia</Text>
      <Text style={styles.subtitle}>Leia, medite e guarde a Palavra de Deus.</Text>

      <View style={styles.searchWrap}>
        <SearchField placeholder="Buscar livro, capítulo ou versículo" value={busca} onChangeText={setBusca} />
      </View>

      <VersionSelector />

      <Pressable onPress={continuarLeitura}>
        <Card style={styles.continueCard}>
          <View style={styles.continueRow}>
            <View style={styles.continueTextWrap}>
              <Text style={styles.continueLabel}>CONTINUE LENDO</Text>
              <Text style={styles.continueTitle}>
                {leituraAtual.livroNome} {leituraAtual.capitulo}:{leituraAtual.versiculo}
              </Text>
            </View>
            <View style={styles.continueIcon}>
              <MaterialCommunityIcons name="book-open-page-variant" size={22} color={colors.gold500} />
            </View>
          </View>
          <ProgressBar progress={leituraAtual.progresso} />
          <Text style={styles.continuePercent}>{Math.round(leituraAtual.progresso * 100)}% deste livro</Text>
        </Card>
      </Pressable>

      <View style={styles.section}>
        <SectionHeader title="Livros da Bíblia" />

        <TestamentTabs ativo={testamentoAtivo} onSelecionar={setTestamentoAtivo} />

        {livrosFiltrados.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum livro encontrado para "{busca}".</Text>
        ) : (
          <Card padded={false} style={styles.groupCard}>
            <View style={styles.groupInner}>
              {livrosFiltrados.map((livro, index) => (
                <BookRow
                  key={livro.id}
                  livro={livro}
                  isLast={index === livrosFiltrados.length - 1}
                  onPress={() => abrirLivro(livro.id)}
                />
              ))}
            </View>
          </Card>
        )}
      </View>
    </ScreenContainer>
  );
}

function TestamentTabs({
  ativo,
  onSelecionar,
}: {
  ativo: Testamento;
  onSelecionar: (testamento: Testamento) => void;
}) {
  return (
    <View style={styles.tabs}>
      <TestamentTab
        label="Antigo Testamento"
        selecionado={ativo === 'antigo'}
        onPress={() => onSelecionar('antigo')}
      />
      <TestamentTab label="Novo Testamento" selecionado={ativo === 'novo'} onPress={() => onSelecionar('novo')} />
    </View>
  );
}

function TestamentTab({
  label,
  selecionado,
  onPress,
}: {
  label: string;
  selecionado: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.tab, selecionado && styles.tabSelecionado]}
    >
      <Text
        style={[styles.tabLabel, selecionado && styles.tabLabelSelecionado]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.85}
      >
        {label.toUpperCase()}
      </Text>
    </Pressable>
  );
}

function VersionSelector() {
  return (
    <Pressable style={styles.versionRow}>
      <View>
        <Text style={styles.versionLabel}>VERSÃO</Text>
        <Text style={styles.versionName}>{versaoPadrao.nome}</Text>
      </View>
      <View style={styles.versionRight}>
        <Text style={styles.versionSigla}>{versaoPadrao.sigla}</Text>
        <MaterialCommunityIcons name="chevron-down" size={20} color={colors.ink400} />
      </View>
    </Pressable>
  );
}

function BookRow({ livro, isLast, onPress }: { livro: Livro; isLast: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.bookRow, !isLast && styles.bookRowDivider, pressed && styles.bookRowPressed]}
    >
      <Text style={styles.bookName}>{livro.nome}</Text>
      <MaterialCommunityIcons name="chevron-right" size={18} color={colors.ink400} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.h1,
    color: colors.ink900,
    paddingTop: spacing.lg,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.ink600,
    marginBottom: spacing.xxl,
  },
  searchWrap: {
    marginBottom: spacing.md,
  },
  versionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.cream300,
    borderRadius: radii.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xxl,
  },
  versionLabel: {
    ...typography.label,
    color: colors.ink400,
    marginBottom: 2,
  },
  versionName: {
    ...typography.bodyMedium,
    color: colors.ink900,
  },
  versionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  versionSigla: {
    ...typography.caption,
    color: colors.navy700,
    marginRight: spacing.xs,
  },
  continueCard: {
    marginBottom: spacing.xxxl,
  },
  continueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  continueTextWrap: {
    flex: 1,
    marginRight: spacing.md,
  },
  continueLabel: {
    ...typography.label,
    color: colors.gold500,
    marginBottom: spacing.xs,
  },
  continueTitle: {
    ...typography.h3,
    color: colors.ink900,
  },
  continueIcon: {
    width: 48,
    height: 48,
    borderRadius: radii.pill,
    backgroundColor: colors.gold100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continuePercent: {
    ...typography.caption,
    color: colors.ink600,
    marginTop: spacing.sm,
    textAlign: 'right',
  },
  section: {
    marginBottom: spacing.xl,
  },
  emptyText: {
    ...typography.body,
    color: colors.ink600,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.cream300,
    borderRadius: radii.pill,
    padding: 4,
    marginBottom: spacing.xl,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm + 2,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabSelecionado: {
    backgroundColor: colors.navy800,
  },
  tabLabel: {
    ...typography.label,
    color: colors.ink600,
  },
  tabLabelSelecionado: {
    color: colors.white,
  },
  groupCard: {
    overflow: 'hidden',
  },
  groupInner: {
    paddingHorizontal: spacing.lg,
  },
  bookRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  bookRowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  bookRowPressed: {
    opacity: 0.6,
  },
  bookName: {
    ...typography.bodyMedium,
    color: colors.ink900,
  },
});
