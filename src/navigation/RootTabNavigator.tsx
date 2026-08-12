import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { JejumScreen, OracaoScreen, PerfilScreen } from '../screens';
import { colors, fontFamilies } from '../theme';
import { FastingProvider } from '../context/FastingContext';
import { DevotionalProvider } from '../context/DevotionalContext';
import { BibliaStackNavigator } from './BibliaStackNavigator';
import { HomeStackNavigator } from './HomeStackNavigator';
import { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

const ICONS: Record<keyof RootTabParamList, React.ComponentProps<typeof MaterialCommunityIcons>['name']> = {
  Inicio: 'home-variant-outline',
  Biblia: 'book-open-page-variant-outline',
  Oracao: 'hands-pray',
  Jejum: 'leaf',
  Perfil: 'account-outline',
};

const ICONS_ACTIVE: Record<keyof RootTabParamList, React.ComponentProps<typeof MaterialCommunityIcons>['name']> = {
  Inicio: 'home-variant',
  Biblia: 'book-open-page-variant',
  Oracao: 'hands-pray',
  Jejum: 'leaf',
  Perfil: 'account',
};

const LABELS: Record<keyof RootTabParamList, string> = {
  Inicio: 'Início',
  Biblia: 'Bíblia',
  Oracao: 'Oração',
  Jejum: 'Jejum',
  Perfil: 'Perfil',
};

/**
 * Navegação principal do app. Estrutura fixa por decisão de produto:
 * Início | Bíblia | Oração | Jejum | Perfil.
 * Não substituir nenhuma aba sem autorização explícita.
 */
export function RootTabNavigator() {
  return (
    <FastingProvider>
      <DevotionalProvider>
        <RootTabs />
      </DevotionalProvider>
    </FastingProvider>
  );
}

function RootTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        // Garante que cada aba renderize somente sua própria tela — nunca o
        // conteúdo de outra aba junto, mesmo em ambientes web/dev com hot-reload.
        unmountOnBlur: true,
        tabBarActiveTintColor: colors.gold500,
        tabBarInactiveTintColor: 'rgba(255,255,255,0.55)',
        tabBarStyle: {
          backgroundColor: colors.navy900,
          borderTopWidth: 0,
          height: 84,
          paddingTop: 10,
          paddingBottom: 22,
        },
        tabBarLabelStyle: {
          fontFamily: fontFamilies.sansMedium,
          fontSize: 11,
          marginTop: 2,
        },
        tabBarIcon: ({ color, focused }) => (
          <MaterialCommunityIcons
            name={focused ? ICONS_ACTIVE[route.name] : ICONS[route.name]}
            size={22}
            color={color}
          />
        ),
        tabBarLabel: LABELS[route.name],
      })}
    >
      <Tab.Screen name="Inicio" component={HomeStackNavigator} />
      <Tab.Screen name="Biblia" component={BibliaStackNavigator} />
      <Tab.Screen name="Oracao" component={OracaoScreen} />
      <Tab.Screen name="Jejum" component={JejumScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}
