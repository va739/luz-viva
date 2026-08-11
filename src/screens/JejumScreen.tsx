import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Card,
  ExpandableCard,
  ExpandableSection,
  IconCircle,
  LogoMark,
  PrimaryButton,
  ProgressBar,
  ScreenContainer,
} from '../components';
import { colors, fontFamilies, radii, spacing, typography } from '../theme';
import {
  duracoesDisponiveis,
  guiaJejum,
  JejumBiblico,
  jejunsBiblicos,
  mensagemCentralJejum,
  oracaoJejum,
  versiculoJejum,
} from '../data/fastingData';
import { useFasting } from '../context/FastingContext';

/** Renderiza o versículo destacando apenas o trecho indicado, não o texto inteiro. */
function VersiculoComDestaque({ texto, destaque }: { texto: string; destaque: string }) {
  const indice = texto.indexOf(destaque);
  if (indice === -1) {
    return <Text style={styles.verseText}>“{texto}”</Text>;
  }
  const antes = texto.slice(0, indice);
  const depois = texto.slice(indice + destaque.length);
  return (
    <Text style={styles.verseText}>
      “{antes}
      <Text style={styles.verseHighlight}>{destaque}</Text>
      {depois}”
    </Text>
  );
}

function ItemLista({ texto }: { texto: string }) {
  return (
    <View style={styles.bulletRow}>
      <View style={styles.bulletDot} />
      <Text style={styles.bulletText}>{texto}</Text>
    </View>
  );
}

const ICONES_BIBLICOS: Record<string, React.ComponentProps<typeof MaterialCommunityIcons>['name']> = {
  ester: 'crown-outline',
  daniel: 'book-open-variant',
  jesus: 'white-balance-sunny',
};

/**
 * Reorganização final: a tela passa a ser uma sequência de cards com
 * hierarquia clara — Seu Jejum (sempre visível, é a ação principal) seguido
 * de Oração, Reflexão, Guia do Jejum e Jejuns na Bíblia (cards de resumo que
 * expandem ao toque, para não empilhar todo o conteúdo aberto de uma vez).
 * Conteúdo e estado (FastingContext) preservados das Etapas 1 e 2.
 */
export function JejumScreen() {
  const [duracaoSelecionada, setDuracaoSelecionada] = useState(3);
  const [proposito, setProposito] = useState('');
  const [biblicoSelecionado, setBiblicoSelecionado] = useState<JejumBiblico | null>(null);
  const { jejumAtivo, iniciarJejum: iniciarJejumContexto, encerrarJejum: encerrarJejumContexto } = useFasting();

  const iniciarJejum = () => {
    iniciarJejumContexto(duracaoSelecionada, proposito.trim());
  };

  const encerrarJejum = () => {
    encerrarJejumContexto();
    setProposito('');
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Jejum</Text>
      <Text style={styles.subtitle}>Uma jornada de disciplina espiritual e entrega a Deus.</Text>

      <Card variant="dark" style={styles.heroCard}>
        <View style={styles.heroIconWrap}>
          <LogoMark size={26} color={colors.gold400} />
        </View>
        <Text style={styles.heroLabel}>O PROPÓSITO DO JEJUM</Text>
        <Text style={styles.heroText}>{mensagemCentralJejum}</Text>
      </Card>

      {/* SEU JEJUM — card principal, sempre visível (não é um resumo colapsado) */}
      <Card style={styles.jejumCard}>
        {jejumAtivo ? (
          <>
            <Text style={styles.cardLabel}>SEU JEJUM EM ANDAMENTO</Text>
            <View style={styles.progressRow}>
              <View style={styles.progressTextWrap}>
                {!!jejumAtivo.proposito && <Text style={styles.progressTitle}>{jejumAtivo.proposito}</Text>}
                <Text style={styles.progressSubtitle}>
                  Dia {jejumAtivo.diaAtual} de {jejumAtivo.duracaoDias}
                </Text>
              </View>
              <View style={styles.progressIcon}>
                <LogoMark size={22} color={colors.gold500} />
              </View>
            </View>
            <ProgressBar progress={jejumAtivo.diaAtual / jejumAtivo.duracaoDias} />
            <Text style={styles.progressPercent}>
              {Math.round((jejumAtivo.diaAtual / jejumAtivo.duracaoDias) * 100)}% concluído
            </Text>

            <Pressable
              onPress={encerrarJejum}
              style={({ pressed }) => [styles.endLink, pressed && styles.endLinkPressed]}
            >
              <Text style={styles.endLinkLabel}>Encerrar jejum</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Text style={styles.cardLabel}>SEU JEJUM</Text>

            <Text style={styles.fieldLabel}>DURAÇÃO DO JEJUM</Text>
            <View style={styles.durationRow}>
              {duracoesDisponiveis.map((opcao) => {
                const selecionado = opcao.dias === duracaoSelecionada;
                return (
                  <Pressable
                    key={opcao.dias}
                    onPress={() => setDuracaoSelecionada(opcao.dias)}
                    style={[styles.durationPill, selecionado && styles.durationPillSelecionada]}
                  >
                    <Text style={[styles.durationLabel, selecionado && styles.durationLabelSelecionada]}>
                      {opcao.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={[styles.fieldLabel, styles.fieldLabelSpaced]}>PROPÓSITO DO SEU JEJUM</Text>
            <TextInput
              style={[styles.fieldInput, styles.fieldTextArea]}
              placeholder="Ex.: Buscar direção, gratidão, cura, entrega..."
              placeholderTextColor={colors.ink400}
              value={proposito}
              onChangeText={setProposito}
              multiline
              textAlignVertical="top"
            />

            <View style={styles.startButtonWrap}>
              <PrimaryButton label="Iniciar Jejum" onPress={iniciarJejum} />
            </View>
          </>
        )}
      </Card>

      {/* ORAÇÃO */}
      <ExpandableCard title="Oração" subtitle="Um momento para entregar seu propósito a Deus.">
        <Card variant="dark" style={styles.verseCard}>
          <View style={styles.verseHeaderLeft}>
            <MaterialCommunityIcons name="hands-pray" size={16} color={colors.gold400} />
            <Text style={styles.verseLabel}>ORAÇÃO PARA O JEJUM</Text>
          </View>
          <Text style={styles.verseText}>“{oracaoJejum}”</Text>
        </Card>
      </ExpandableCard>

      {/* REFLEXÃO */}
      <ExpandableCard title="Reflexão" subtitle="Um momento para meditar na Palavra de Deus.">
        <Card variant="dark" style={styles.verseCard}>
          <View style={styles.verseHeaderLeft}>
            <MaterialCommunityIcons name="white-balance-sunny" size={16} color={colors.gold400} />
            <Text style={styles.verseLabel}>VERSÍCULO SOBRE O JEJUM</Text>
          </View>
          <VersiculoComDestaque texto={versiculoJejum.texto} destaque={versiculoJejum.destaque} />
          <Text style={styles.verseReference}>{versiculoJejum.referencia}</Text>
        </Card>
      </ExpandableCard>

      {/* GUIA DO JEJUM */}
      <ExpandableCard title="Guia do jejum" subtitle="Entenda e prepare-se para viver sua jornada de jejum.">
        <Card padded={false} style={styles.groupCardSpaced}>
          <View style={styles.groupInner}>
            <ExpandableSection title={guiaJejum.introTitulo} isLast>
              <Text style={styles.paragraph}>{guiaJejum.introTexto}</Text>
            </ExpandableSection>
          </View>
        </Card>

        <View style={styles.noticeCard}>
          <View style={styles.noticeHeader}>
            <MaterialCommunityIcons name="information-outline" size={18} color={colors.gold500} />
            <Text style={styles.noticeTitle}>{guiaJejum.observacaoTitulo}</Text>
          </View>
          {guiaJejum.observacaoParagrafos.map((paragrafo) => (
            <Text key={paragrafo} style={styles.noticeParagraph}>
              {paragrafo}
            </Text>
          ))}
          <View style={styles.noticeDivider} />
          <Text style={styles.noticeDestaque}>{guiaJejum.observacaoDestaque}</Text>
        </View>

        <Card padded={false} style={styles.groupCard}>
          <View style={styles.groupInner}>
            <ExpandableSection title={guiaJejum.antesTitulo}>
              <Text style={styles.paragraph}>{guiaJejum.antesIntro}</Text>
              {guiaJejum.antesItens.map((item) => (
                <ItemLista key={item} texto={item} />
              ))}
            </ExpandableSection>

            <ExpandableSection title={guiaJejum.duranteTitulo}>
              <Text style={styles.paragraph}>{guiaJejum.duranteIntro}</Text>
              {guiaJejum.duranteItens.map((item) => (
                <ItemLista key={item} texto={item} />
              ))}
              <Text style={[styles.paragraph, styles.paragraphClosing]}>{guiaJejum.duranteFechamento}</Text>
            </ExpandableSection>

            <ExpandableSection title={guiaJejum.encerrandoTitulo} isLast>
              <Text style={styles.paragraph}>{guiaJejum.encerrandoTexto}</Text>
            </ExpandableSection>
          </View>
        </Card>
      </ExpandableCard>

      {/* JEJUNS NA BÍBLIA */}
      <ExpandableCard title="Jejuns na Bíblia" subtitle="Conheça alguns jejuns registrados nas Escrituras.">
        <Card padded={false} style={styles.groupCard}>
          <View style={styles.groupInner}>
            {jejunsBiblicos.map((item, index) => (
              <Pressable
                key={item.id}
                onPress={() => setBiblicoSelecionado(item)}
                style={({ pressed }) => [
                  styles.biblicoRow,
                  index < jejunsBiblicos.length - 1 && styles.biblicoRowDivider,
                  pressed && styles.biblicoRowPressed,
                ]}
              >
                <IconCircle
                  name={ICONES_BIBLICOS[item.id]}
                  backgroundColor={colors.tintPeach}
                  iconColor={colors.tintPeachIcon}
                  size={44}
                  iconSize={20}
                />
                <View style={styles.biblicoTextWrap}>
                  <Text style={styles.biblicoNome}>{item.nome}</Text>
                  <Text style={styles.biblicoResumo}>{item.resumo}</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={18} color={colors.ink400} />
              </Pressable>
            ))}
          </View>
        </Card>
      </ExpandableCard>

      <Modal
        visible={!!biblicoSelecionado}
        animationType="slide"
        transparent
        onRequestClose={() => setBiblicoSelecionado(null)}
      >
        <View style={styles.overlay}>
          <View style={styles.sheet}>
            {biblicoSelecionado && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{biblicoSelecionado.nome}</Text>
                  <Pressable
                    style={styles.modalCloseButton}
                    onPress={() => setBiblicoSelecionado(null)}
                    hitSlop={8}
                  >
                    <MaterialCommunityIcons name="close" size={20} color={colors.navy700} />
                  </Pressable>
                </View>
                <Text style={styles.modalDescricao}>{biblicoSelecionado.descricao}</Text>
                <Text style={styles.modalReferencia}>{biblicoSelecionado.referencia}</Text>
                <Text style={styles.aiHint}>
                  Este é um conteúdo de descoberta. A jornada guiada do {biblicoSelecionado.nome} será implementada
                  em uma etapa futura — ela é diferente do seu jejum pessoal.
                </Text>
                <Pressable
                  onPress={() => setBiblicoSelecionado(null)}
                  style={({ pressed }) => [styles.saveButton, pressed && styles.saveButtonPressed]}
                >
                  <Text style={styles.saveButtonLabel}>Entendi</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScreenContainer>
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
  heroCard: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  heroIconWrap: {
    width: 56,
    height: 56,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: 'rgba(198, 161, 91, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  heroLabel: {
    ...typography.label,
    color: colors.gold400,
    marginBottom: spacing.md,
  },
  heroText: {
    ...typography.verse,
    fontSize: 17,
    lineHeight: 26,
    color: colors.white,
    textAlign: 'center',
  },
  jejumCard: {
    marginBottom: spacing.lg,
  },
  cardLabel: {
    ...typography.label,
    color: colors.gold500,
    marginBottom: spacing.lg,
  },
  fieldLabel: {
    ...typography.label,
    color: colors.ink400,
    marginBottom: spacing.sm,
  },
  fieldLabelSpaced: {
    marginTop: spacing.lg,
  },
  durationRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  durationPill: {
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.pill,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  durationPillSelecionada: {
    backgroundColor: colors.navy800,
    borderColor: colors.navy800,
  },
  durationLabel: {
    ...typography.bodyMedium,
    color: colors.ink900,
  },
  durationLabelSelecionada: {
    color: colors.white,
  },
  fieldInput: {
    ...typography.body,
    color: colors.ink900,
    backgroundColor: colors.white,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  fieldTextArea: {
    minHeight: 90,
  },
  startButtonWrap: {
    marginTop: spacing.xl,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  progressTextWrap: {
    flex: 1,
    marginRight: spacing.md,
  },
  progressTitle: {
    ...typography.h3,
    color: colors.ink900,
    marginBottom: 2,
  },
  progressSubtitle: {
    ...typography.caption,
    color: colors.ink600,
  },
  progressIcon: {
    width: 48,
    height: 48,
    borderRadius: radii.pill,
    backgroundColor: colors.gold100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressPercent: {
    ...typography.caption,
    color: colors.ink600,
    marginTop: spacing.sm,
    textAlign: 'right',
  },
  endLink: {
    alignSelf: 'center',
    marginTop: spacing.lg,
  },
  endLinkPressed: {
    opacity: 0.6,
  },
  endLinkLabel: {
    ...typography.caption,
    color: colors.ink400,
    textDecorationLine: 'underline',
  },
  groupCard: {
    overflow: 'hidden',
  },
  groupCardSpaced: {
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  groupInner: {
    paddingHorizontal: spacing.lg,
  },
  paragraph: {
    ...typography.body,
    color: colors.ink600,
    lineHeight: 22,
  },
  paragraphClosing: {
    marginTop: spacing.md,
    fontStyle: 'italic',
    color: colors.ink600,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: spacing.sm,
  },
  bulletDot: {
    width: 5,
    height: 5,
    borderRadius: radii.pill,
    backgroundColor: colors.gold500,
    marginTop: 8,
    marginRight: spacing.sm,
  },
  bulletText: {
    ...typography.body,
    color: colors.ink900,
    flex: 1,
  },
  noticeCard: {
    backgroundColor: colors.gold100,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: 'rgba(198, 161, 91, 0.35)',
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  noticeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  noticeTitle: {
    ...typography.bodyMedium,
    color: colors.ink900,
    marginLeft: spacing.sm,
  },
  noticeParagraph: {
    ...typography.caption,
    color: colors.ink600,
    lineHeight: 19,
    marginBottom: spacing.sm,
  },
  noticeDivider: {
    height: 1,
    backgroundColor: 'rgba(198, 161, 91, 0.35)',
    marginVertical: spacing.sm,
  },
  noticeDestaque: {
    ...typography.bodyMedium,
    fontSize: 13,
    color: colors.ink900,
    fontStyle: 'italic',
  },
  biblicoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  biblicoRowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  biblicoRowPressed: {
    opacity: 0.6,
  },
  biblicoTextWrap: {
    flex: 1,
    marginLeft: spacing.md,
    marginRight: spacing.sm,
  },
  biblicoNome: {
    ...typography.bodyMedium,
    color: colors.ink900,
    marginBottom: 2,
  },
  biblicoResumo: {
    ...typography.caption,
    color: colors.ink600,
  },
  verseCard: {
    marginBottom: 0,
  },
  verseHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  verseLabel: {
    ...typography.label,
    color: colors.gold400,
    marginLeft: spacing.sm,
  },
  verseText: {
    ...typography.verse,
    color: colors.white,
    marginBottom: spacing.md,
  },
  verseHighlight: {
    fontFamily: fontFamilies.serifBold,
    color: colors.gold400,
  },
  verseReference: {
    ...typography.bodyMedium,
    color: colors.gold400,
  },
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.cream100,
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    padding: spacing.xxl,
    maxHeight: '88%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  modalTitle: {
    ...typography.h2,
    color: colors.ink900,
    flex: 1,
    marginRight: spacing.md,
  },
  modalCloseButton: {
    width: 36,
    height: 36,
    borderRadius: radii.pill,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  modalDescricao: {
    ...typography.body,
    color: colors.ink900,
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  modalReferencia: {
    ...typography.bodyMedium,
    color: colors.gold500,
    marginBottom: spacing.xl,
  },
  aiHint: {
    ...typography.caption,
    color: colors.ink400,
    fontStyle: 'italic',
    marginBottom: spacing.xl,
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: colors.navy800,
    borderRadius: radii.pill,
    paddingVertical: spacing.md + 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonPressed: {
    opacity: 0.85,
  },
  saveButtonLabel: {
    ...typography.bodyMedium,
    color: colors.white,
  },
});
