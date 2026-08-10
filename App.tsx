import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreenNative from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  PlayfairDisplay_400Regular,
  PlayfairDisplay_500Medium,
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
} from '@expo-google-fonts/playfair-display';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { RootTabNavigator } from './src/navigation';
import { SplashScreen as BrandSplashScreen } from './src/screens';
import { colors } from './src/theme';

SplashScreenNative.preventAutoHideAsync().catch(() => {});

// Tempo mínimo em que a splash de marca fica visível após as fontes carregarem,
// para garantir uma transição suave (nunca é apenas um "flash").
const MIN_BRAND_SPLASH_MS = 1200;

export default function App() {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_500Medium,
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const [showBrandSplash, setShowBrandSplash] = useState(true);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreenNative.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (!fontsLoaded) return;
    const timer = setTimeout(() => setShowBrandSplash(false), MIN_BRAND_SPLASH_MS);
    return () => clearTimeout(timer);
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  if (showBrandSplash) {
    return (
      <SafeAreaProvider onLayout={onLayoutRootView}>
        <BrandSplashScreen />
        <StatusBar style="light" />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <NavigationContainer
        theme={{
          dark: false,
          colors: {
            primary: colors.navy800,
            background: colors.cream100,
            card: colors.white,
            text: colors.ink900,
            border: colors.border,
            notification: colors.gold500,
          },
          fonts: {
            regular: { fontFamily: 'System', fontWeight: '400' },
            medium: { fontFamily: 'System', fontWeight: '500' },
            bold: { fontFamily: 'System', fontWeight: '700' },
            heavy: { fontFamily: 'System', fontWeight: '800' },
          },
        }}
      >
        <RootTabNavigator />
      </NavigationContainer>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
