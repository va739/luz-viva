import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { LogoMark } from '../LogoMark';
import { DiaDaSemanaInfo } from '../../context/DevotionalContext';

type Props = {
  dias: DiaDaSemanaInfo[];
};

/**
 * Visão semanal discreta do Devocional (DOM a SÁB). Cada dia mostra seu
 * próprio estado (não iniciado / em andamento / concluído), com um destaque
 * sutil para o dia atual. O sábado usa o símbolo da marca (folha) em vez do
 * ponto padrão, para reforçar que é um momento diferente — descanso, não
 * mais um dia de jornada.
 */
export function WeekStrip({ dias }: Props) {
  return (
    <View style={styles.row}>
      {dias.map((dia, indice) => (
        <View key={indice} style={styles.item}>
          <View style={[styles.marker, dia.ehHoje && styles.markerHoje]}>
            {dia.ehSabado ? (
              <LogoMark size={13} color={dia.status === 'concluido' ? colors.navy700 : colors.ink200} />
            ) : (
              <View
                style={[
                  styles.dot,
                  dia.status === 'concluido' && styles.dotConcluido,
                  dia.status === 'andamento' && styles.dotAndamento,
                ]}
              />
            )}
          </View>
          <Text style={[styles.label, dia.ehHoje && styles.labelHoje]}>{dia.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.xs,
  },
  item: {
    alignItems: 'center',
  },
  marker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  markerHoje: {
    borderWidth: 1.5,
    borderColor: colors.gold500,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: colors.ink200,
  },
  dotConcluido: {
    backgroundColor: colors.navy700,
    borderColor: colors.navy700,
  },
  dotAndamento: {
    backgroundColor: colors.gold500,
    borderColor: colors.gold500,
  },
  label: {
    ...typography.caption,
    fontSize: 10,
    color: colors.ink400,
  },
  labelHoje: {
    color: colors.navy700,
    fontFamily: typography.label.fontFamily,
  },
});
