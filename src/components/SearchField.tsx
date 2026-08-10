import React, { useState } from 'react';
import { Platform, StyleSheet, TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radii, shadows, spacing, typography } from '../theme';

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
};

// react-native-web suporta outlineWidth/outlineStyle em tempo de execução,
// mas o tipo TextStyle do RN ainda não declara essas props — daí o `as any`.
const semContornoDoNavegador =
  Platform.OS === 'web' ? ({ outlineWidth: 0, outlineStyle: 'none', outlineColor: 'transparent' } as any) : null;

/**
 * Campo de busca reutilizável — mesmo visual de card suave da identidade,
 * pronto para ser usado em outras áreas do app (Devocional, Pregações etc.).
 */
export function SearchField({ placeholder, value, onChangeText }: Props) {
  const [focado, setFocado] = useState(false);

  return (
    <View style={[styles.wrap, focado && styles.wrapFocado]}>
      <MaterialCommunityIcons name="magnify" size={20} color={colors.ink400} />
      <TextInput
        style={[styles.input, semContornoDoNavegador]}
        placeholder={placeholder}
        placeholderTextColor={colors.ink400}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        onFocus={() => setFocado(true)}
        onBlur={() => setFocado(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    height: 48,
    ...shadows.floating,
  },
  wrapFocado: {
    borderColor: colors.gold400,
    borderWidth: 1.5,
  },
  input: {
    flex: 1,
    marginLeft: spacing.sm,
    ...typography.body,
    color: colors.ink900,
  },
});
