// src/navigation/HomeStackNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TelaFeedNoticias from '../screens/TelaFeedNoticias';
import TelaNoticiaDetalhe from '../screens/TelaNoticiaDetalhe';

export type HomeStackParamList = {
  Feed: undefined;
  Detalhe: {
    noticiaId: string;
    url: string; // ← adicionado: URL original da matéria para o WebView
  };
};

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Feed"
    >
      <Stack.Screen name="Feed" component={TelaFeedNoticias} />
      <Stack.Screen name="Detalhe" component={TelaNoticiaDetalhe} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
