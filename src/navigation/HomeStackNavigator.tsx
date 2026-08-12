import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DevocionalScreen, HomeScreen } from '../screens';
import { HomeStackParamList } from './types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

/**
 * Navegação interna da aba Início: Home → Devocional Diário. Fica aninhada
 * dentro da tab "Inicio" para que a barra inferior permaneça visível e
 * "Início" continue selecionada durante a experiência do Devocional.
 */
export function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Devocional" component={DevocionalScreen} />
    </Stack.Navigator>
  );
}
