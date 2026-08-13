import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { KIDS_ILUSTRACOES, KidsIlustracaoId } from './illustrations';

type Props = {
  ilustracao: KidsIlustracaoId;
  height: number;
  style?: ViewStyle;
  radius?: number;
};

/**
 * Imagem de destaque da área Kids: ocupa a largura total do contêiner (não
 * uma miniatura dentro de um card) para ter presença visual real. Hoje
 * renderiza uma ilustração autoral em SVG — mesma limitação/abordagem do
 * DevotionalImage (ver relatório da tarefa). A prop `ilustracao` é o único
 * ponto de acoplamento; trocar por uma foto real no futuro significa apenas
 * trocar a implementação interna deste componente.
 */
export function KidsImage({ ilustracao, height, style, radius = 0 }: Props) {
  const Ilustracao = KIDS_ILUSTRACOES[ilustracao];
  return (
    <View style={[styles.base, { height, borderRadius: radius }, style]}>
      <Ilustracao width="100%" height="100%" />
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    width: '100%',
    overflow: 'hidden',
  },
});
