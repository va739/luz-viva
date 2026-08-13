import React from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PlaceholderScreen } from './PlaceholderScreen';
import { HomeStackParamList } from '../navigation/types';

type Navigation = NativeStackNavigationProp<HomeStackParamList, 'KidsPlaceholder'>;
type Route = RouteProp<HomeStackParamList, 'KidsPlaceholder'>;

/**
 * Placeholder das jornadas da área Kids (histórias, jogos, atividades...)
 * ainda não implementadas. Lê o título vindo da navegação e reaproveita o
 * PlaceholderScreen já usado por outros módulos em construção.
 */
export function KidsPlaceholderScreen() {
  const navigation = useNavigation<Navigation>();
  const { params } = useRoute<Route>();

  return (
    <PlaceholderScreen
      icon="star-outline"
      title={params.titulo}
      description={params.descricao ?? 'Essa jornada está sendo preparada com muito carinho e chega em breve para as crianças.'}
      onBack={() => navigation.goBack()}
    />
  );
}
