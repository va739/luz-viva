import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BibliaCapitulosScreen, BibliaLeituraScreen, BibliaScreen } from '../screens';
import { BibliaStackParamList } from './types';

const Stack = createNativeStackNavigator<BibliaStackParamList>();

/**
 * Navegação interna da aba Bíblia: lista de livros → capítulos → leitura.
 * Fica aninhada dentro da tab "Biblia" para que a barra inferior
 * permaneça visível e "Bíblia" continue selecionada durante toda a jornada.
 */
export function BibliaStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BibliaHome" component={BibliaScreen} />
      <Stack.Screen name="Capitulos" component={BibliaCapitulosScreen} />
      <Stack.Screen name="Leitura" component={BibliaLeituraScreen} />
    </Stack.Navigator>
  );
}
