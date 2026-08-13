import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KidsImage, ProgressBar, ScreenContainer } from '../components';
import { colors, radii, spacing, typography } from '../theme';
import { kidsPalette } from '../theme/kidsPalette';
import { HomeStackParamList } from '../navigation/types';
import { continuarAprendendo, exploreItems, faixasEtarias, historiaDestaque } from '../data/kidsData';

type Navigation = NativeStackNavigationProp<HomeStackParamList, 'Kids'>;

const CORES_TITULO = [kidsPalette.blueDeep, kidsPalette.orange, kidsPalette.greenDeep, kidsPalette.purpleDeep];

export function KidsScreen() {
  const navigation = useNavigation<Navigation>();
  const [faixaSelecionadaId, setFaixaSelecionadaId] = useState(faixasEtarias[0].id);

  const entrada = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(entrada, { toValue: 1, duration: 700, useNativeDriver: true }).start();
  }, [entrada]);

  const fadeHero = entrada.interpolate({ inputRange: [0, 0.3], outputRange: [0, 1], extrapolate: 'clamp' });
  const fadeSheet = entrada.interpolate({ inputRange: [0.15, 0.5], outputRange: [0, 1], extrapolate: 'clamp' });
  const slideSheet = entrada.interpolate({ inputRange: [0.15, 0.5], outputRange: [16, 0], extrapolate: 'clamp' });
  const fadeFaixas = entrada.interpolate({ inputRange: [0.3, 0.65], outputRange: [0, 1], extrapolate: 'clamp' });
  const fadeDestaque = entrada.interpolate({ inputRange: [0.45, 0.8], outputRange: [0, 1], extrapolate: 'clamp' });
  const fadeExplore = entrada.interpolate({ inputRange: [0.55, 0.9], outputRange: [0, 1], extrapolate: 'clamp' });
  const fadeContinue = entrada.interpolate({ inputRange: [0.65, 1], outputRange: [0, 1], extrapolate: 'clamp' });

  const abrirPlaceholder = (titulo: string, descricao?: string) => {
    navigation.navigate('KidsPlaceholder', { titulo, descricao });
  };

  return (
    <ScreenContainer contentStyle={styles.telaSemPadding}>
      <Animated.View style={{ opacity: fadeHero }}>
        <View style={styles.heroWrap}>
          <KidsImage ilustracao="heroKids" height={260} />
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton} hitSlop={10}>
            <MaterialCommunityIcons name="chevron-left" size={22} color={colors.navy700} />
          </Pressable>
          <Pressable style={styles.favButton} hitSlop={10}>
            <MaterialCommunityIcons name="star-outline" size={20} color={colors.navy700} />
          </Pressable>
        </View>
      </Animated.View>

      <Animated.View style={[styles.folha, { opacity: fadeSheet, transform: [{ translateY: slideSheet }] }]}>
        <View style={styles.tituloRow}>
          {'Kids'.split('').map((letra, indice) => (
            <Text key={indice} style={[styles.tituloLetra, { color: CORES_TITULO[indice % CORES_TITULO.length] }]}>
              {letra}
            </Text>
          ))}
        </View>
        <Text style={styles.subtitulo}>Descobrindo o amor de Deus de um jeito divertido.</Text>
      </Animated.View>

      <View style={styles.conteudoPadded}>
        <Animated.View style={{ opacity: fadeFaixas }}>
          <Text style={styles.sectionTitle}>Escolha sua faixa etária</Text>
          <View style={styles.faixasRow}>
            {faixasEtarias.map((faixa) => {
              const selecionada = faixa.id === faixaSelecionadaId;
              return (
                <Pressable
                  key={faixa.id}
                  onPress={() => setFaixaSelecionadaId(faixa.id)}
                  style={({ pressed }) => [styles.faixaCard, pressed && styles.pressedSuave]}
                >
                  <View style={[styles.faixaImagemWrap, selecionada && styles.faixaImagemWrapSelecionada]}>
                    <KidsImage ilustracao={faixa.ilustracao} height={64} radius={radii.md} />
                    {selecionada && (
                      <View style={styles.faixaCheck}>
                        <MaterialCommunityIcons name="check" size={12} color={colors.white} />
                      </View>
                    )}
                  </View>
                  <Text style={styles.faixaTitulo}>{faixa.titulo}</Text>
                  <Text style={styles.faixaAnos}>anos</Text>
                </Pressable>
              );
            })}
          </View>
        </Animated.View>

        <Animated.View style={{ opacity: fadeDestaque }}>
          <Text style={[styles.sectionTitle, styles.sectionTitleComEspaco]}>História em destaque</Text>
          <Pressable
            onPress={() => abrirPlaceholder(historiaDestaque.titulo, historiaDestaque.descricao)}
            style={({ pressed }) => [styles.destaqueCard, pressed && styles.pressedSuave]}
          >
            <KidsImage ilustracao={historiaDestaque.ilustracao} height={170} radius={radii.lg} style={styles.destaqueImagem} />
            <Text style={styles.destaqueTitulo}>{historiaDestaque.titulo.toUpperCase()}</Text>
            <Text style={styles.destaqueDescricao}>{historiaDestaque.descricao}</Text>
            <View style={styles.lerHistoriaButton}>
              <MaterialCommunityIcons name="book-open-page-variant-outline" size={16} color={colors.navy800} />
              <Text style={styles.lerHistoriaLabel}>Ler história</Text>
            </View>
          </Pressable>
        </Animated.View>

        <Animated.View style={{ opacity: fadeExplore }}>
          <Text style={[styles.sectionTitle, styles.sectionTitleComEspaco]}>Explore</Text>
          <View style={styles.exploreRow}>
            {exploreItems.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => abrirPlaceholder(item.titulo)}
                style={({ pressed }) => [styles.exploreItem, pressed && styles.pressedSuave]}
              >
                <KidsImage ilustracao={item.ilustracao} height={58} radius={radii.pill} style={styles.exploreImagem} />
                <Text style={styles.exploreLabel} numberOfLines={2}>
                  {item.titulo}
                </Text>
              </Pressable>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={{ opacity: fadeContinue }}>
          <Text style={[styles.sectionTitle, styles.sectionTitleComEspaco]}>Continue aprendendo</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.continueRow}
          >
            {continuarAprendendo.map((historia) => (
              <Pressable
                key={historia.id}
                onPress={() => abrirPlaceholder(historia.titulo)}
                style={({ pressed }) => [styles.continueCard, pressed && styles.pressedSuave]}
              >
                <KidsImage ilustracao={historia.ilustracao} height={90} radius={radii.md} style={styles.continueImagem} />
                <Text style={styles.continueTitulo} numberOfLines={2}>
                  {historia.titulo}
                </Text>
                {historia.percentual > 0 ? (
                  <>
                    <ProgressBar progress={historia.percentual / 100} />
                    <Text style={styles.continuePercentual}>{historia.percentual}% concluído</Text>
                  </>
                ) : (
                  <Text style={styles.continueNovo}>Novo</Text>
                )}
              </Pressable>
            ))}
          </ScrollView>
        </Animated.View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  telaSemPadding: {
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  heroWrap: {
    width: '100%',
    position: 'relative',
  },
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
  },
  favButton: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.xl,
    width: 38,
    height: 38,
    borderRadius: radii.pill,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  folha: {
    backgroundColor: colors.cream100,
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    marginTop: -20,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
    alignItems: 'center',
  },
  tituloRow: {
    flexDirection: 'row',
  },
  tituloLetra: {
    fontFamily: typography.logo.fontFamily,
    fontSize: 40,
  },
  subtitulo: {
    ...typography.body,
    color: colors.ink600,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  conteudoPadded: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.huge,
  },
  sectionTitle: {
    ...typography.h2,
    fontSize: 18,
    color: colors.ink900,
    marginBottom: spacing.lg,
  },
  sectionTitleComEspaco: {
    marginTop: spacing.xxl,
  },
  pressedSuave: {
    opacity: 0.85,
  },
  faixasRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  faixaCard: {
    alignItems: 'center',
    width: '23%',
  },
  faixaImagemWrap: {
    width: '100%',
    borderRadius: radii.md,
    borderWidth: 2,
    borderColor: 'transparent',
    marginBottom: spacing.sm,
  },
  faixaImagemWrapSelecionada: {
    borderColor: kidsPalette.yellowDeep,
  },
  faixaCheck: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 18,
    height: 18,
    borderRadius: radii.pill,
    backgroundColor: kidsPalette.greenDeep,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.cream100,
  },
  faixaTitulo: {
    ...typography.bodyMedium,
    fontSize: 13,
    color: colors.ink900,
  },
  faixaAnos: {
    ...typography.caption,
    fontSize: 11,
    color: colors.ink400,
  },
  destaqueCard: {
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  destaqueImagem: {
    marginBottom: spacing.lg,
  },
  destaqueTitulo: {
    ...typography.label,
    color: kidsPalette.blueDeep,
    marginBottom: spacing.xs,
  },
  destaqueDescricao: {
    ...typography.body,
    color: colors.ink600,
    marginBottom: spacing.lg,
  },
  lerHistoriaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.sm,
    backgroundColor: kidsPalette.tintYellow,
    borderRadius: radii.pill,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  lerHistoriaLabel: {
    ...typography.bodyMedium,
    fontSize: 13,
    color: colors.navy800,
  },
  exploreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  exploreItem: {
    alignItems: 'center',
    width: 62,
  },
  exploreImagem: {
    marginBottom: spacing.sm,
  },
  exploreLabel: {
    ...typography.caption,
    fontSize: 10.5,
    lineHeight: 13,
    color: colors.ink600,
    textAlign: 'center',
  },
  continueRow: {
    gap: spacing.md,
    paddingRight: spacing.xl,
  },
  continueCard: {
    width: 148,
  },
  continueImagem: {
    marginBottom: spacing.sm,
  },
  continueTitulo: {
    ...typography.bodyMedium,
    fontSize: 13,
    color: colors.ink900,
    marginBottom: spacing.sm,
    minHeight: 34,
  },
  continuePercentual: {
    ...typography.caption,
    fontSize: 11,
    color: colors.ink400,
    marginTop: spacing.xs,
  },
  continueNovo: {
    ...typography.label,
    fontSize: 10,
    color: kidsPalette.greenDeep,
  },
});
