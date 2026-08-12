import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Card,
  IconTextAction,
  KidsMark,
  LogoMark,
  ProgressBar,
  ScreenContainer,
  SectionHeader,
  ShortcutCard,
} from '../components';
import { colors, radii, spacing, typography } from '../theme';
import { propositoAtual, versiculoDoDia } from '../data/dailyContent';
import { HomeStackParamList, RootTabParamList } from '../navigation/types';
import { useFasting } from '../context/FastingContext';
import { useDevotional } from '../context/DevotionalContext';

// Etapa 1: usuário mockado. Será substituído pelo módulo de autenticação/perfil.
const usuario = { nome: 'Mariana' };

type Navigation = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList, 'HomeMain'>,
  BottomTabNavigationProp<RootTabParamList, 'Inicio'>
>;

export function HomeScreen() {
  const navigation = useNavigation<Navigation>();
  const { jejumAtivo } = useFasting();
  const { resumoHome } = useDevotional();

  const devocionalSubtitulo =
    resumoHome.tipo === 'jornada'
      ? `${resumoHome.tema} · Dia ${resumoHome.numeroDia} de ${resumoHome.totalDias}`
      : resumoHome.titulo;
  return (
    <ScreenContainer>
      <View style={styles.topRow}>
        <Pressable style={styles.iconButton} hitSlop={8}>
          <MaterialCommunityIcons name="bell-outline" size={20} color={colors.navy700} />
        </Pressable>
        <View style={styles.premiumBadge}>
          <MaterialCommunityIcons name="star-outline" size={14} color={colors.gold500} />
          <Text style={styles.premiumLabel}>Premium</Text>
        </View>
      </View>

      <View style={styles.logoRow}>
        <View style={styles.logoSpacer} />
        <View style={styles.logoBlock}>
          <View style={styles.logoLuzRow}>
            <View style={styles.logoLeaf}>
              <LogoMark size={22} color={colors.gold500} />
            </View>
            <Text style={styles.logoLuz}>Luz</Text>
          </View>
          <Text style={styles.logoViva}>VIVA</Text>
          <Text style={styles.logoSlogan}>Sua caminhada diária com Deus</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarInitial}>{usuario.nome.charAt(0)}</Text>
        </View>
      </View>

      <View style={styles.greeting}>
        <View style={styles.greetingTitleRow}>
          <Text style={styles.greetingTitle}>Bom dia, {usuario.nome}</Text>
          <View style={styles.greetingLeaf}>
            <LogoMark size={16} color={colors.tintSageIcon} />
          </View>
        </View>
        <Text style={styles.greetingSubtitle}>Que Deus esteja com você hoje!</Text>
      </View>

      <Card variant="dark" style={styles.verseCard}>
        <View style={styles.verseHeader}>
          <View style={styles.verseHeaderLeft}>
            <MaterialCommunityIcons name="white-balance-sunny" size={16} color={colors.gold400} />
            <Text style={styles.verseLabel}>VERSÍCULO DO DIA</Text>
          </View>
          <Pressable hitSlop={8}>
            <MaterialCommunityIcons name="bookmark-outline" size={20} color={colors.gold400} />
          </Pressable>
        </View>

        <Text style={styles.verseText}>“{versiculoDoDia.texto}”</Text>
        <Text style={styles.verseReference}>{versiculoDoDia.referencia}</Text>

        <View style={styles.verseDivider} />

        <View style={styles.verseActions}>
          <IconTextAction icon="heart-outline" label="Salvar" color={colors.gold400} />
          <IconTextAction icon="share-variant-outline" label="Compartilhar" color={colors.gold400} />
        </View>
      </Card>

      <View style={styles.section}>
        <SectionHeader title="Seu momento de hoje" actionLabel="Ver tudo" />
        <View style={styles.shortcutsRow}>
          <ShortcutCard
            icon="book-open-page-variant-outline"
            title="Devocional"
            subtitle={devocionalSubtitulo}
            backgroundColor={colors.tintPeach}
            iconColor={colors.tintPeachIcon}
            onPress={() => navigation.navigate('Devocional')}
          />
          <ShortcutCard
            icon="hands-pray"
            title="Oração"
            subtitle="Fale com Deus e encontre paz"
            backgroundColor={colors.tintSage}
            iconColor={colors.tintSageIcon}
            onPress={() => navigation.navigate('Oracao')}
          />
          <ShortcutCard
            customIcon={<LogoMark size={18} color={colors.tintLilacIcon} />}
            title="Citação"
            subtitle="Uma nova palavra para o seu dia"
            backgroundColor={colors.tintLilac}
            iconColor={colors.tintLilacIcon}
          />
        </View>
      </View>

      <Pressable onPress={() => navigation.navigate('Jejum')}>
        <Card style={styles.purposeCard}>
          {jejumAtivo ? (
            <>
              <View style={[styles.purposeRow, styles.purposeRowActive]}>
                <View style={styles.purposeTextWrap}>
                  <Text style={styles.purposeLabel}>SEU JEJUM EM ANDAMENTO</Text>
                  {!!jejumAtivo.proposito && <Text style={styles.purposeTitle}>{jejumAtivo.proposito}</Text>}
                  <Text style={styles.purposeSubtitle}>
                    Dia {jejumAtivo.diaAtual} de {jejumAtivo.duracaoDias}
                  </Text>
                </View>
                <View style={styles.purposeIcon}>
                  <View style={styles.purposeIconGlyph}>
                    <LogoMark size={22} color={colors.gold500} />
                  </View>
                </View>
              </View>
              <ProgressBar progress={jejumAtivo.diaAtual / jejumAtivo.duracaoDias} />
              <View style={styles.purposeFooterRow}>
                <Text style={styles.purposePercent}>
                  {Math.round((jejumAtivo.diaAtual / jejumAtivo.duracaoDias) * 100)}% concluído
                </Text>
                <Text style={styles.purposeContinueLink}>Continuar jejum →</Text>
              </View>
            </>
          ) : (
            <View style={styles.purposeRow}>
              <View style={styles.purposeTextWrap}>
                <Text style={styles.purposeTitle}>{propositoAtual.titulo}</Text>
                <Text style={styles.purposeSubtitle}>{propositoAtual.subtitulo}</Text>
              </View>
              <View style={styles.purposeIcon}>
                <View style={styles.purposeIconGlyph}>
                  <LogoMark size={22} color={colors.gold500} />
                </View>
              </View>
            </View>
          )}
        </Card>
      </Pressable>

      <View style={styles.section}>
        <SectionHeader title="Descubra mais" />
        <View style={styles.discoverRow}>
          <DiscoverItem customIcon={<KidsMark size={22} color={colors.navy700} />} label="Kids" />
          <DiscoverItem icon="play-box-outline" label="Pregações" />
          <DiscoverItem icon="view-grid-outline" label="Mais" />
        </View>
      </View>
    </ScreenContainer>
  );
}

function DiscoverItem({
  icon,
  customIcon,
  label,
  onPress,
}: {
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  customIcon?: React.ReactNode;
  label: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.discoverItem, pressed && onPress && styles.discoverItemPressed]}
    >
      <View style={styles.discoverIcon}>
        {customIcon ?? (icon && <MaterialCommunityIcons name={icon} size={22} color={colors.navy700} />)}
      </View>
      <Text style={styles.discoverLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.lg,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: radii.pill,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radii.pill,
    backgroundColor: colors.gold100,
  },
  premiumLabel: {
    ...typography.label,
    color: colors.gold500,
    marginLeft: spacing.xs,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  logoSpacer: {
    width: 44,
  },
  logoBlock: {
    flex: 1,
    alignItems: 'center',
  },
  logoLuzRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoLeaf: {
    marginRight: spacing.xs,
    marginBottom: 6,
    transform: [{ rotate: '-8deg' }],
  },
  logoLuz: {
    fontFamily: typography.logo.fontFamily,
    fontSize: 30,
    color: colors.navy800,
  },
  logoViva: {
    fontFamily: typography.h3.fontFamily,
    fontSize: 15,
    letterSpacing: 6,
    color: colors.gold500,
    marginTop: -4,
  },
  logoSlogan: {
    ...typography.caption,
    fontSize: 11,
    letterSpacing: 1,
    color: colors.ink600,
    marginTop: spacing.xs,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: radii.pill,
    backgroundColor: colors.navy800,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    ...typography.h3,
    color: colors.gold400,
  },
  greeting: {
    marginTop: spacing.xxl,
    marginBottom: spacing.xxl,
    alignItems: 'flex-start',
  },
  greetingTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  greetingTitle: {
    ...typography.h1,
    color: colors.ink900,
  },
  greetingLeaf: {
    marginLeft: spacing.sm,
    transform: [{ rotate: '10deg' }],
  },
  greetingSubtitle: {
    ...typography.body,
    color: colors.ink600,
  },
  verseCard: {
    marginBottom: spacing.lg,
  },
  verseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  verseHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verseLabel: {
    ...typography.label,
    color: colors.gold400,
    marginLeft: spacing.sm,
  },
  verseText: {
    ...typography.verse,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  verseReference: {
    ...typography.bodyMedium,
    color: colors.gold400,
    textAlign: 'center',
  },
  verseDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.12)',
    marginVertical: spacing.lg,
  },
  verseActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xxxl,
  },
  section: {
    marginBottom: spacing.xxxl,
  },
  shortcutsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  purposeCard: {
    marginBottom: spacing.xxxl,
  },
  purposeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  purposeRowActive: {
    marginBottom: spacing.lg,
  },
  purposeTextWrap: {
    flex: 1,
    marginRight: spacing.md,
  },
  purposeLabel: {
    ...typography.label,
    color: colors.gold500,
    marginBottom: spacing.xs,
  },
  purposeTitle: {
    ...typography.h3,
    color: colors.ink900,
    marginBottom: 2,
  },
  purposeSubtitle: {
    ...typography.caption,
    color: colors.ink600,
  },
  purposeFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  purposePercent: {
    ...typography.caption,
    color: colors.ink600,
  },
  purposeContinueLink: {
    ...typography.caption,
    color: colors.navy600,
  },
  purposeIcon: {
    width: 48,
    height: 48,
    borderRadius: radii.pill,
    backgroundColor: colors.gold100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  purposeIconGlyph: {
    transform: [{ rotate: '-12deg' }],
  },
  discoverRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  discoverItem: {
    alignItems: 'center',
    width: 60,
  },
  discoverItemPressed: {
    opacity: 0.6,
  },
  discoverIcon: {
    width: 56,
    height: 56,
    borderRadius: radii.pill,
    backgroundColor: colors.cream300,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  discoverLabel: {
    ...typography.caption,
    color: colors.ink600,
    textAlign: 'center',
  },
});
