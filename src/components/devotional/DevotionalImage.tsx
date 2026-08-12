import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { ILUSTRACOES, IlustracaoId } from './illustrations';

type Props = {
  ilustracao: IlustracaoId;
  height: number;
  style?: ViewStyle;
  radius?: number;
};

/**
 * Imagem de destaque do Devocional: ocupa a largura total do contêiner (não
 * uma miniatura dentro de um card) para ter presença visual real. Hoje
 * renderiza uma ilustração autoral em SVG — ver limitação de assets reais no
 * relatório da tarefa. A prop `ilustracao` é o único ponto de acoplamento;
 * trocar por uma foto real no futuro significa apenas trocar a implementação
 * interna deste componente, sem alterar quem o utiliza.
 */
export function DevotionalImage({ ilustracao, height, style, radius = 0 }: Props) {
  const Ilustracao = ILUSTRACOES[ilustracao];
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
