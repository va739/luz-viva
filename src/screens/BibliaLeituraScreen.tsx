import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScreenContainer } from '../components';
import { colors, radii, spacing, typography } from '../theme';
import { BibliaStackParamList } from '../navigation/types';
import { obterLivro } from '../data/bibleBooks';
import { Versiculo, obterSecoes, obterVersiculos } from '../data/bibleText';
import { versaoPadrao } from '../data/bibleVersions';

type Navigation = NativeStackNavigationProp<BibliaStackParamList, 'Leitura'>;
type Rota = RouteProp<BibliaStackParamList, 'Leitura'>;

export function BibliaLeituraScreen() {
  const navigation = useNavigation<Navigation>();
  const { params } = useRoute<Rota>();
  const livro = obterLivro(params.livroId);
  const versiculos = obterVersiculos(params.livroId, params.capitulo);
  const secoes = obterSecoes(params.livroId, params.capitulo);
  const tituloPorVersiculo = new Map(secoes.map((secao) => [secao.versiculoInicial, secao.titulo]));

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
          <MaterialCommunityIcons name="chevron-left" size={24} color={colors.navy700} />
        </Pressable>
        <Text style={styles.versionBadge}>{versaoPadrao.sigla}</Text>
      </View>

      <Text style={styles.chapterLabel}>
        {livro ? livro.nome : ''} {params.capitulo}
      </Text>

      {versiculos ? (
        <View style={styles.verses}>
          {versiculos.map((versiculo) => {
            const tituloSecao = tituloPorVersiculo.get(versiculo.numero);
            return (
              <React.Fragment key={versiculo.numero}>
                {tituloSecao ? <Text style={styles.sectionTitle}>{tituloSecao}</Text> : null}
                <VerseItem versiculo={versiculo} />
              </React.Fragment>
            );
          })}
        </View>
      ) : (
        <View style={styles.emptyWrap}>
          <View style={styles.emptyIcon}>
            <MaterialCommunityIcons name="book-open-page-variant-outline" size={26} color={colors.navy700} />
          </View>
          <Text style={styles.emptyTitle}>Texto em preparação</Text>
          <Text style={styles.emptyText}>
            O texto deste capítulo ainda não foi adicionado nesta etapa. A navegação já está pronta para recebê-lo.
          </Text>
        </View>
      )}
    </ScreenContainer>
  );
}

function VerseItem({ versiculo }: { versiculo: Versiculo }) {
  const [expandido, setExpandido] = useState(false);
  const [grifado, setGrifado] = useState(false);
  const [salvo, setSalvo] = useState(false);
  const [mostrarAnotacao, setMostrarAnotacao] = useState(false);

  return (
    <Pressable onPress={() => setExpandido((valor) => !valor)}>
      <View style={[styles.verseRow, grifado && styles.verseRowGrifado]}>
        <Text style={styles.verseNumber}>{versiculo.numero}</Text>
        <Text style={styles.verseText}>{versiculo.texto}</Text>
      </View>

      {expandido && (
        <View style={styles.actionsRow}>
          <VerseAction
            icon={salvo ? 'bookmark' : 'bookmark-outline'}
            label="Salvar"
            active={salvo}
            onPress={() => setSalvo((valor) => !valor)}
          />
          <VerseAction
            icon="marker"
            label="Grifar"
            active={grifado}
            onPress={() => setGrifado((valor) => !valor)}
          />
          <VerseAction
            icon="note-text-outline"
            label="Anotar"
            active={mostrarAnotacao}
            onPress={() => setMostrarAnotacao((valor) => !valor)}
          />
          <VerseAction icon="share-variant-outline" label="Compartilhar" />
        </View>
      )}

      {mostrarAnotacao && (
        <View style={styles.noteBox}>
          <Text style={styles.notePlaceholder}>Sua anotação para este versículo aparecerá aqui.</Text>
        </View>
      )}
    </Pressable>
  );
}

function VerseAction({
  icon,
  label,
  active,
  onPress,
}: {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  label: string;
  active?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable style={styles.action} onPress={onPress} hitSlop={6}>
      <MaterialCommunityIcons name={icon} size={17} color={active ? colors.gold500 : colors.ink400} />
      <Text style={[styles.actionLabel, active && styles.actionLabelActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  versionBadge: {
    ...typography.label,
    color: colors.navy700,
    backgroundColor: colors.cream300,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: radii.pill,
  },
  chapterLabel: {
    ...typography.label,
    fontSize: 13,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: colors.navy700,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    ...typography.h1,
    color: colors.ink900,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  verses: {
    marginBottom: spacing.xl,
  },
  verseRow: {
    flexDirection: 'row',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.sm,
  },
  verseRowGrifado: {
    backgroundColor: colors.gold100,
  },
  verseNumber: {
    ...typography.caption,
    color: colors.gold500,
    fontFamily: typography.bodyMedium.fontFamily,
    width: 22,
    marginRight: spacing.xs,
  },
  verseText: {
    ...typography.body,
    fontSize: 17,
    lineHeight: 27,
    color: colors.ink900,
    flex: 1,
  },
  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 30,
    marginBottom: spacing.md,
    gap: spacing.lg,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionLabel: {
    ...typography.caption,
    color: colors.ink400,
    marginLeft: spacing.xs,
  },
  actionLabelActive: {
    color: colors.gold500,
  },
  noteBox: {
    marginLeft: 30,
    marginBottom: spacing.md,
    padding: spacing.md,
    borderRadius: radii.sm,
    backgroundColor: colors.cream300,
  },
  notePlaceholder: {
    ...typography.caption,
    color: colors.ink600,
    fontStyle: 'italic',
  },
  emptyWrap: {
    alignItems: 'center',
    paddingTop: spacing.huge,
    paddingHorizontal: spacing.xl,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: radii.pill,
    backgroundColor: colors.cream300,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.ink900,
    marginBottom: spacing.sm,
  },
  emptyText: {
    ...typography.body,
    color: colors.ink600,
    textAlign: 'center',
  },
});
