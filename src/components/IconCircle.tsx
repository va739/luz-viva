import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { radii } from '../theme';

type Props = {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  backgroundColor: string;
  iconColor: string;
  size?: number;
  iconSize?: number;
};

/**
 * Círculo com ícone usado em atalhos e listas do Perfil.
 * A cor de fundo é sempre um tom suave (tint); o ícone usa a cor mais saturada correspondente.
 */
export function IconCircle({ name, backgroundColor, iconColor, size = 52, iconSize = 24 }: Props) {
  return (
    <View
      style={[
        styles.circle,
        { width: size, height: size, borderRadius: radii.pill, backgroundColor },
      ]}
    >
      <MaterialCommunityIcons name={name} size={iconSize} color={iconColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
