import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { DevotionalImage, IconTextAction, PrimaryButton, ProgressBar, ScreenContainer, WeekStrip } from '../components';
import { IlustracaoId } from '../components/devotional/illustrations';
import { colors, radii, spacing, typography } from '../theme';
import { EtapaDevocional, ProgressoDia, useDevotional } from '../context/DevotionalContext';
import { HomeStackParamList } from '../navigation/types';
import {
  mensagemConclusaoDescanso,
  mensagemConclusaoJornada,
  mensagensConclusaoDia,
  referenciaCompleta,
  referenciaVersiculo,
} from '../data/devotionalData';

type Navigation = NativeStackNavigationProp<HomeStackParamList, 'Devocional'>;

type Etapa =
  | 'jornada'
  | 'passagem'
  | 'reflexao'
  | 'citacao'
  | 'oracao'
  | 'descanso'
  | 'conclusaoDia'
  | 'conclusaoJornada';

const MESES = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

const ALTURA_ABERTURA = 340;
const ALTURA_IMAGEM_SECAO = 220;

function formatarDataPorExtenso(data: Date): string {
  return `${data.getDate()} de ${MESES[data.getMonth()]} de ${data.getFullYear()}`;
}

function contarEtapasConcluidas(progresso: ProgressoDia): number {
  return Object.values(progresso).filter(Boolean).length;
}

function BlocoDevocional({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <View style={styles.blocoDevocional}>
      <Text style={styles.blocoTitulo}>{titulo}</Text>
      {texto.split('\n\n').map((paragrafo, indice) => (
        <Text key={indice} style={styles.blocoParagrafo}>
          {paragrafo}
        </Text>
      ))}
    </View>
  );
}

export function DevocionalScreen() {
  const navigation = useNavigation<Navigation>();
  const { height: alturaJanela } = useWindowDimensions();
  const alturaCitacao = Math.max(480, Math.min(alturaJanela - 120, 720));
  const {
    conteudoHoje,
    progressoEtapas,
    diaHojeConcluido,
    descansoConcluido,
    semana,
    pontosDaJornadaAtual,
    concluirEtapa,
    concluirDescanso,
  } = useDevotional();

  const [etapa, setEtapa] = useState<Etapa>('jornada');
  const [versiculoIndex, setVersiculoIndex] = useState(0);
  const dataFormatada = useRef(formatarDataPorExtenso(new Date())).current;

  const entrada = useRef(new Animated.Value(0)).current;
  const escalaConclusao = useRef(new Animated.Value(0.85)).current;
  const versoAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    entrada.setValue(0);
    Animated.timing(entrada, { toValue: 1, duration: 650, useNativeDriver: true }).start();
    if (etapa === 'conclusaoDia' || etapa === 'conclusaoJornada') {
      escalaConclusao.setValue(0.85);
      Animated.spring(escalaConclusao, { toValue: 1, friction: 6, tension: 60, useNativeDriver: true }).start();
    }
    if (etapa === 'passagem') setVersiculoIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [etapa]);

  useEffect(() => {
    versoAnim.setValue(0);
    Animated.timing(versoAnim, { toValue: 1, duration: 380, useNativeDriver: true }).start();
  }, [versiculoIndex, versoAnim]);

  const fadeA = entrada.interpolate({ inputRange: [0, 0.4], outputRange: [0, 1], extrapolate: 'clamp' });
  const fadeB = entrada.interpolate({ inputRange: [0.25, 0.65], outputRange: [0, 1], extrapolate: 'clamp' });
  const slideB = entrada.interpolate({ inputRange: [0.25, 0.65], outputRange: [14, 0], extrapolate: 'clamp' });
  const fadeC = entrada.interpolate({ inputRange: [0.45, 0.8], outputRange: [0, 1], extrapolate: 'clamp' });
  const fadeD = entrada.interpolate({ inputRange: [0.65, 1], outputRange: [0, 1], extrapolate: 'clamp' });
  const slideD = entrada.interpolate({ inputRange: [0.65, 1], outputRange: [10, 0], extrapolate: 'clamp' });

  const versoOpacidade = versoAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });
  const versoDeslocamento = versoAnim.interpolate({ inputRange: [0, 1], outputRange: [14, 0] });

  const irParaProximaEtapaPendente = () => {
    const p = progressoEtapas!;
    if (!p.passagem) setEtapa('passagem');
    else if (!p.devocional) setEtapa('reflexao');
    else if (!p.citacao) setEtapa('citacao');
    else setEtapa('oracao');
  };

  const aoPressionarBotaoPrincipal = () => {
    if (conteudoHoje.tipo === 'descanso') {
      setEtapa(descansoConcluido ? 'conclusaoDia' : 'descanso');
      return;
    }
    if (diaHojeConcluido) {
      setEtapa('conclusaoDia');
      return;
    }
    irParaProximaEtapaPendente();
  };

  const avancarVersiculo = () => {
    if (conteudoHoje.tipo !== 'jornada') return;
    const total = conteudoHoje.dia.passagem.versiculos.length;
    if (versiculoIndex < total - 1) {
      setVersiculoIndex((indice) => indice + 1);
    } else {
      concluirEtapa('passagem');
      setEtapa('reflexao');
    }
  };

  const concluirReflexao = () => {
    concluirEtapa('devocional');
    setEtapa('citacao');
  };
  const concluirCitacaoEtapa = () => {
    concluirEtapa('citacao');
    setEtapa('oracao');
  };
  const concluirOracaoEtapa = () => {
    concluirEtapa('oracao');
    const ultimoDia = conteudoHoje.tipo === 'jornada' && conteudoHoje.dia.numeroDia === conteudoHoje.dia.totalDias;
    setEtapa(ultimoDia ? 'conclusaoJornada' : 'conclusaoDia');
  };
  const concluirDescansoEtapa = () => {
    concluirDescanso();
    setEtapa('conclusaoDia');
  };

  const labelBotaoPrincipal = (() => {
    if (conteudoHoje.tipo === 'descanso') return descansoConcluido ? 'Revisar descanso' : 'Começar';
    if (diaHojeConcluido) return 'Revisar dia';
    const feitas = progressoEtapas ? contarEtapasConcluidas(progressoEtapas) : 0;
    return feitas > 0 ? 'Continuar' : 'Começar';
  })();

  const numeroEtapaAtual: Record<EtapaDevocional, number> = { passagem: 1, devocional: 2, citacao: 3, oracao: 4 };
  const progressoEtapasAtual = progressoEtapas ? contarEtapasConcluidas(progressoEtapas) : 0;

  function renderBackFlutuante(onBack: () => void) {
    return (
      <Pressable onPress={onBack} style={styles.backButtonFlutuante} hitSlop={10}>
        <MaterialCommunityIcons name="chevron-left" size={22} color={colors.white} />
      </Pressable>
    );
  }

  function renderCabecalhoImagem(ilustracao: IlustracaoId, altura: number, onBack: () => void) {
    return (
      <View style={[styles.imagemCabecalho, { height: altura }]}>
        <DevotionalImage ilustracao={ilustracao} height={altura} />
        <LinearGradient colors={['rgba(14,27,51,0.32)', 'rgba(14,27,51,0)']} style={styles.imagemScrimTopo} pointerEvents="none" />
        {renderBackFlutuante(onBack)}
      </View>
    );
  }

  function renderEtapaProgresso(etapaNumero: number) {
    return (
      <View style={styles.etapaProgressoWrap}>
        <Text style={styles.etapaProgressoLabel}>ETAPA {etapaNumero} DE 4</Text>
        <ProgressBar progress={progressoEtapasAtual / 4} />
      </View>
    );
  }

  function renderJornada() {
    const ilustracao = conteudoHoje.tipo === 'jornada' ? conteudoHoje.dia.ilustracaoPrincipal : conteudoHoje.descanso.ilustracao;
    return (
      <>
        <Animated.View style={{ opacity: fadeA }}>
          <View style={[styles.imagemCabecalho, { height: ALTURA_ABERTURA }]}>
            <DevotionalImage ilustracao={ilustracao} height={ALTURA_ABERTURA} />
            <LinearGradient colors={['rgba(14,27,51,0.35)', 'rgba(14,27,51,0)']} style={styles.imagemScrimTopo} pointerEvents="none" />
            {renderBackFlutuante(() => navigation.goBack())}
            <Animated.Text style={[styles.dataFlutuante, { opacity: fadeC }]}>{dataFormatada.toUpperCase()}</Animated.Text>
          </View>
        </Animated.View>

        <View style={styles.folha}>
          <WeekStrip dias={semana} />

          {conteudoHoje.tipo === 'jornada' ? (
            <>
              <Animated.Text style={[styles.heroTema, { opacity: fadeB, transform: [{ translateY: slideB }] }]}>
                {conteudoHoje.jornada.tema}
              </Animated.Text>
              <Animated.View style={{ opacity: fadeC }}>
                <Text style={styles.heroDia}>
                  Dia {conteudoHoje.dia.numeroDia} de {conteudoHoje.dia.totalDias}
                </Text>
                <View style={styles.dotsRow}>
                  {pontosDaJornadaAtual.map((concluido, indice) => (
                    <View key={indice} style={[styles.dot, concluido && styles.dotConcluido]} />
                  ))}
                </View>
                <Text style={styles.heroDescricao}>{conteudoHoje.jornada.descricaoBreve}</Text>
              </Animated.View>
            </>
          ) : (
            <>
              <Animated.Text style={[styles.heroTema, { opacity: fadeB, transform: [{ translateY: slideB }] }]}>
                {conteudoHoje.descanso.titulo}
              </Animated.Text>
              <Animated.View style={{ opacity: fadeC }}>
                <Text style={styles.heroDia}>Sábado</Text>
                <Text style={styles.heroDescricao}>{conteudoHoje.descanso.fraseDestaque}</Text>
              </Animated.View>
            </>
          )}

          <Animated.View style={{ opacity: fadeD, transform: [{ translateY: slideD }] }}>
            <View style={styles.actionButtonWrap}>
              <PrimaryButton label={labelBotaoPrincipal} onPress={aoPressionarBotaoPrincipal} />
            </View>
          </Animated.View>
        </View>
      </>
    );
  }

  function renderPassagem() {
    if (conteudoHoje.tipo !== 'jornada') return null;
    const { passagem, ilustracaoPrincipal } = conteudoHoje.dia;
    const versiculo = passagem.versiculos[versiculoIndex];
    const mostrarIndicador = passagem.versiculos.length > 1;
    const ultimoVersiculo = versiculoIndex === passagem.versiculos.length - 1;

    return (
      <>
        {renderCabecalhoImagem(ilustracaoPrincipal, ALTURA_IMAGEM_SECAO, () => setEtapa('jornada'))}
        <View style={styles.conteudoPadded}>
          <Text style={styles.overlineLabel}>A PALAVRA</Text>

          {mostrarIndicador && (
            <View style={styles.indicadorRow}>
              <Text style={styles.indicadorTexto}>
                {versiculoIndex + 1} de {passagem.versiculos.length}
              </Text>
              <View style={styles.indicadorDots}>
                {passagem.versiculos.map((_, indice) => (
                  <View
                    key={indice}
                    style={[
                      styles.indicadorDot,
                      indice === versiculoIndex && styles.indicadorDotAtivo,
                      indice < versiculoIndex && styles.indicadorDotFeito,
                    ]}
                  />
                ))}
              </View>
            </View>
          )}

          <Animated.View style={{ opacity: versoOpacidade, transform: [{ translateY: versoDeslocamento }] }}>
            <Text style={styles.versiculoReferencia}>{referenciaVersiculo(passagem, versiculoIndex)}</Text>
            <Text style={styles.versiculoTexto}>“{versiculo.texto}”</Text>
          </Animated.View>

          <View style={styles.actionButtonWrap}>
            <PrimaryButton label={ultimoVersiculo ? 'Concluir passagem' : 'Continuar'} onPress={avancarVersiculo} />
          </View>
        </View>
      </>
    );
  }

  function renderReflexao() {
    if (conteudoHoje.tipo !== 'jornada') return null;
    const { devocional, ilustracaoDevocional } = conteudoHoje.dia;
    return (
      <>
        {renderCabecalhoImagem(ilustracaoDevocional, ALTURA_IMAGEM_SECAO, () => setEtapa('jornada'))}
        <View style={styles.conteudoPadded}>
          {renderEtapaProgresso(numeroEtapaAtual.devocional)}
          <Text style={styles.overlineLabel}>DEVOCIONAL</Text>
          <Text style={styles.devocionalTitulo}>{devocional.titulo}</Text>

          <BlocoDevocional titulo="O contexto" texto={devocional.contexto} />
          <BlocoDevocional titulo="O que esta Palavra revela" texto={devocional.oQueRevela} />
          <BlocoDevocional titulo="O que Deus quer nos ensinar" texto={devocional.oQueDeusQuerEnsinar} />
          <BlocoDevocional titulo="Trazendo para a vida" texto={devocional.aplicacao} />

          <View style={styles.perguntaBox}>
            <Text style={styles.perguntaLabel}>PARA GUARDAR NO CORAÇÃO</Text>
            <Text style={styles.perguntaTexto}>{devocional.perguntaReflexao}</Text>
          </View>

          <View style={styles.actionButtonWrap}>
            <PrimaryButton label="Concluir devocional" onPress={concluirReflexao} />
          </View>
        </View>
      </>
    );
  }

  function renderCitacao() {
    if (conteudoHoje.tipo !== 'jornada') return null;
    const { citacao } = conteudoHoje.dia;
    return (
      <View style={[styles.citacaoWrap, { height: alturaCitacao }]}>
        <View style={StyleSheet.absoluteFill}>
          <DevotionalImage ilustracao="luzSuave" height={alturaCitacao} />
        </View>
        <LinearGradient colors={['rgba(14,27,51,0.05)', colors.navy900]} style={StyleSheet.absoluteFill} pointerEvents="none" />

        <View style={styles.citacaoConteudo}>
          {renderBackFlutuante(() => setEtapa('jornada'))}

          <View style={styles.citacaoCentro}>
            <Text style={styles.overlineLabelClaro}>UMA VOZ PARA GUARDAR</Text>
            <MaterialCommunityIcons name="format-quote-open" size={26} color={colors.gold400} style={styles.citacaoIcone} />
            <Text style={styles.citacaoTexto}>“{citacao.texto}”</Text>
            <Text style={styles.citacaoAutor}>{citacao.autor}</Text>
            <View style={styles.citacaoCompartilhar}>
              <IconTextAction icon="share-variant-outline" label="Compartilhar" color={colors.gold400} />
            </View>
          </View>

          <Pressable
            onPress={concluirCitacaoEtapa}
            style={({ pressed }) => [styles.botaoClaro, pressed && styles.botaoClaroPressionado]}
          >
            <Text style={styles.botaoClaroLabel}>Concluir citação</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  function renderOracao() {
    if (conteudoHoje.tipo !== 'jornada') return null;
    const { oracao } = conteudoHoje.dia;
    return (
      <>
        {renderCabecalhoImagem('oracaoLuz', ALTURA_IMAGEM_SECAO, () => setEtapa('jornada'))}
        <View style={styles.conteudoPadded}>
          {renderEtapaProgresso(numeroEtapaAtual.oracao)}
          <Animated.Text style={[styles.overlineLabel, { opacity: fadeA }]}>ORAÇÃO</Animated.Text>

          <Animated.View style={{ opacity: fadeB, transform: [{ translateY: slideB }] }}>
            {oracao.texto.split('\n\n').map((paragrafo, indice) => (
              <Text key={indice} style={styles.oracaoParagrafo}>
                {paragrafo}
              </Text>
            ))}
            <Text style={styles.amemTexto}>Amém.</Text>
          </Animated.View>

          <Animated.View style={{ opacity: fadeD, transform: [{ translateY: slideD }] }}>
            <View style={styles.actionButtonWrap}>
              <PrimaryButton label="Concluir oração" onPress={concluirOracaoEtapa} />
            </View>
          </Animated.View>
        </View>
      </>
    );
  }

  function renderDescanso() {
    if (conteudoHoje.tipo !== 'descanso') return null;
    const { descanso } = conteudoHoje;
    return (
      <>
        {renderCabecalhoImagem(descanso.ilustracao, ALTURA_IMAGEM_SECAO, () => setEtapa('jornada'))}
        <View style={styles.conteudoPadded}>
          <Text style={styles.overlineLabel}>SÁBADO</Text>
          <Text style={styles.devocionalTitulo}>{descanso.titulo}</Text>
          <Text style={styles.descansoFrase}>“{descanso.fraseDestaque}”</Text>

          <View style={styles.blocoDevocional}>
            <Text style={styles.versiculoReferencia}>{referenciaCompleta(descanso.passagem)}</Text>
            <Text style={styles.versiculoTexto}>“{descanso.passagem.versiculos[0].texto}”</Text>
          </View>

          <BlocoDevocional titulo="Reflexão" texto={descanso.reflexao} />

          <View style={styles.perguntaBox}>
            <Text style={styles.perguntaLabel}>ORAÇÃO</Text>
            {descanso.oracao.split('\n\n').map((paragrafo, indice) => (
              <Text key={indice} style={styles.perguntaTexto}>
                {paragrafo}
              </Text>
            ))}
            <Text style={styles.amemTextoEscuro}>Amém.</Text>
          </View>

          <View style={styles.actionButtonWrap}>
            <PrimaryButton label="Concluir descanso" onPress={concluirDescansoEtapa} />
          </View>
        </View>
      </>
    );
  }

  function renderConclusaoDia() {
    const mensagem =
      conteudoHoje.tipo === 'jornada'
        ? mensagensConclusaoDia[(conteudoHoje.dia.numeroDia - 1) % mensagensConclusaoDia.length]
        : mensagemConclusaoDescanso;

    return (
      <View style={styles.conclusaoWrap}>
        <Animated.View style={[styles.conclusaoIconWrap, { transform: [{ scale: escalaConclusao }] }]}>
          <MaterialCommunityIcons name="check" size={30} color={colors.white} />
        </Animated.View>
        <Text style={styles.conclusaoTitulo}>Momento concluído</Text>
        <Text style={styles.conclusaoMensagem}>{mensagem}</Text>

        {conteudoHoje.tipo === 'jornada' && (
          <>
            <Text style={styles.conclusaoDia}>
              Dia {conteudoHoje.dia.numeroDia} de {conteudoHoje.dia.totalDias}
            </Text>
            <View style={styles.dotsRow}>
              {pontosDaJornadaAtual.map((concluido, indice) => (
                <View key={indice} style={[styles.dot, concluido && styles.dotConcluido]} />
              ))}
            </View>
          </>
        )}

        <View style={styles.conclusaoButtonWrap}>
          <PrimaryButton label="Voltar ao Devocional" onPress={() => setEtapa('jornada')} />
        </View>
      </View>
    );
  }

  function renderConclusaoJornada() {
    if (conteudoHoje.tipo !== 'jornada') return null;
    return (
      <View style={styles.conclusaoWrap}>
        <Animated.View style={[styles.conclusaoIconWrapOuro, { transform: [{ scale: escalaConclusao }] }]}>
          <MaterialCommunityIcons name="star-four-points-outline" size={28} color={colors.navy800} />
        </Animated.View>
        <Text style={styles.conclusaoTitulo}>Jornada concluída</Text>
        <Text style={styles.conclusaoDia}>
          {conteudoHoje.dia.totalDias} de {conteudoHoje.dia.totalDias}
        </Text>
        <Text style={styles.conclusaoMensagem}>{mensagemConclusaoJornada}</Text>
        <View style={styles.conclusaoButtonWrap}>
          <PrimaryButton label="Continuar" onPress={() => setEtapa('jornada')} />
        </View>
      </View>
    );
  }

  const conteudoPorEtapa: Record<Etapa, () => React.ReactNode> = {
    jornada: renderJornada,
    passagem: renderPassagem,
    reflexao: renderReflexao,
    citacao: renderCitacao,
    oracao: renderOracao,
    descanso: renderDescanso,
    conclusaoDia: renderConclusaoDia,
    conclusaoJornada: renderConclusaoJornada,
  };

  return (
    <ScreenContainer contentStyle={styles.telaSemPadding}>{conteudoPorEtapa[etapa]()}</ScreenContainer>
  );
}

const styles = StyleSheet.create({
  telaSemPadding: {
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  conteudoPadded: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.huge,
  },
  imagemCabecalho: {
    width: '100%',
    position: 'relative',
  },
  imagemScrimTopo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 90,
  },
  backButtonFlutuante: {
    position: 'absolute',
    top: spacing.lg,
    left: spacing.xl,
    width: 38,
    height: 38,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(14,27,51,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataFlutuante: {
    position: 'absolute',
    top: spacing.lg + 8,
    right: spacing.xl,
    ...typography.label,
    fontSize: 11,
    color: colors.white,
  },
  folha: {
    backgroundColor: colors.cream100,
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    marginTop: -24,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.huge,
  },
  heroTema: {
    ...typography.h1,
    fontSize: 25,
    lineHeight: 31,
    color: colors.ink900,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  heroDia: {
    ...typography.bodyMedium,
    color: colors.gold500,
    marginBottom: spacing.md,
  },
  heroDescricao: {
    ...typography.body,
    color: colors.ink600,
    marginBottom: spacing.xxl,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.ink200,
  },
  dotConcluido: {
    backgroundColor: colors.navy700,
    borderColor: colors.navy700,
  },
  actionButtonWrap: {
    marginTop: spacing.md,
  },
  etapaProgressoWrap: {
    marginBottom: spacing.xl,
  },
  etapaProgressoLabel: {
    ...typography.label,
    color: colors.ink400,
    marginBottom: spacing.sm,
  },
  overlineLabel: {
    ...typography.label,
    color: colors.gold500,
    marginBottom: spacing.md,
  },
  overlineLabelClaro: {
    ...typography.label,
    color: colors.gold400,
    marginBottom: spacing.lg,
  },
  indicadorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  indicadorTexto: {
    ...typography.caption,
    color: colors.ink400,
  },
  indicadorDots: {
    flexDirection: 'row',
    gap: 6,
  },
  indicadorDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.ink200,
  },
  indicadorDotFeito: {
    backgroundColor: colors.gold500,
    borderColor: colors.gold500,
  },
  indicadorDotAtivo: {
    backgroundColor: colors.navy700,
    borderColor: colors.navy700,
  },
  versiculoReferencia: {
    ...typography.bodyMedium,
    color: colors.navy700,
    marginBottom: spacing.md,
  },
  versiculoTexto: {
    ...typography.verse,
    fontSize: 21,
    lineHeight: 31,
    color: colors.ink900,
    marginBottom: spacing.xl,
  },
  devocionalTitulo: {
    ...typography.h1,
    fontSize: 22,
    color: colors.ink900,
    marginBottom: spacing.xl,
  },
  blocoDevocional: {
    marginBottom: spacing.xxl,
  },
  blocoTitulo: {
    ...typography.h3,
    color: colors.navy700,
    marginBottom: spacing.sm,
  },
  blocoParagrafo: {
    ...typography.body,
    color: colors.ink900,
    marginBottom: spacing.md,
  },
  perguntaBox: {
    backgroundColor: colors.cream300,
    borderRadius: radii.lg,
    padding: spacing.xl,
    marginBottom: spacing.xl,
  },
  perguntaLabel: {
    ...typography.label,
    color: colors.gold500,
    marginBottom: spacing.sm,
  },
  perguntaTexto: {
    ...typography.h3,
    fontFamily: typography.body.fontFamily,
    fontStyle: 'italic',
    color: colors.ink900,
    lineHeight: 24,
  },
  citacaoWrap: {
    width: '100%',
    position: 'relative',
  },
  citacaoConteudo: {
    flex: 1,
    padding: spacing.xl,
    paddingTop: spacing.lg,
    justifyContent: 'space-between',
  },
  citacaoCentro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  citacaoIcone: {
    marginBottom: spacing.lg,
  },
  citacaoTexto: {
    ...typography.verse,
    fontSize: 22,
    lineHeight: 32,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  citacaoAutor: {
    ...typography.bodyMedium,
    color: colors.gold400,
    textAlign: 'center',
  },
  citacaoCompartilhar: {
    marginTop: spacing.xxl,
  },
  botaoClaro: {
    backgroundColor: colors.cream100,
    borderRadius: radii.pill,
    paddingVertical: spacing.md + 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoClaroPressionado: {
    opacity: 0.85,
  },
  botaoClaroLabel: {
    ...typography.bodyMedium,
    color: colors.navy800,
  },
  oracaoParagrafo: {
    ...typography.verse,
    fontSize: 18,
    lineHeight: 27,
    color: colors.ink900,
    marginBottom: spacing.lg,
  },
  amemTexto: {
    ...typography.bodyMedium,
    fontStyle: 'italic',
    color: colors.gold500,
    marginBottom: spacing.xl,
  },
  amemTextoEscuro: {
    ...typography.bodyMedium,
    fontStyle: 'italic',
    color: colors.gold500,
    marginTop: spacing.sm,
  },
  descansoFrase: {
    ...typography.verse,
    fontSize: 18,
    lineHeight: 26,
    color: colors.navy700,
    marginBottom: spacing.xxl,
  },
  conclusaoWrap: {
    alignItems: 'center',
    paddingTop: spacing.huge,
    paddingHorizontal: spacing.xl,
  },
  conclusaoIconWrap: {
    width: 64,
    height: 64,
    borderRadius: radii.pill,
    backgroundColor: colors.tintSageIcon,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  conclusaoIconWrapOuro: {
    width: 64,
    height: 64,
    borderRadius: radii.pill,
    backgroundColor: colors.gold100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  conclusaoTitulo: {
    ...typography.h1,
    fontSize: 22,
    color: colors.ink900,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  conclusaoDia: {
    ...typography.bodyMedium,
    color: colors.navy700,
    marginBottom: spacing.md,
  },
  conclusaoMensagem: {
    ...typography.body,
    color: colors.ink600,
    textAlign: 'center',
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  conclusaoButtonWrap: {
    alignSelf: 'stretch',
    marginTop: spacing.lg,
  },
});
