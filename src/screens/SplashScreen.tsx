import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LogoMark } from '../components';
import { colors, spacing, typography } from '../theme';

/**
 * Tela de abertura. Minimalista de propósito: logo, slogan e um pequeno
 * símbolo — sem elementos extras que disputem atenção com a marca.
 */
export function SplashScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.emblem}>
        <LogoMark size={30} color={colors.gold500} />
      </View>
      <Text style={styles.logo}>Luz Viva</Text>
      <Text style={styles.tagline}>SUA CAMINHADA DIÁRIA COM FÉ</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navy900,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
  },
  emblem: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(198, 161, 91, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  logo: {
    ...typography.logo,
    color: colors.white,
    marginBottom: spacing.sm,
  },
  tagline: {
    ...typography.logoTagline,
    color: colors.gold400,
  },
});
