import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DevocionalScreen, HomeScreen, KidsPlaceholderScreen, KidsScreen } from '../screens';
import { HomeStackParamList } from './types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

/**
 * Navegação interna da aba Início: Home → Devocional Diário / Kids. Fica
 * aninhada dentro da tab "Inicio" para que a barra inferior permaneça
 * visível e "Início" continue selecionada durante essas experiências.
 */
export function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Devocional" component={DevocionalScreen} />
      <Stack.Screen name="Kids" component={KidsScreen} />
      <Stack.Screen name="KidsPlaceholder" component={KidsPlaceholderScreen} />
    </Stack.Navigator>
  );
}
