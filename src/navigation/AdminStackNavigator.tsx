import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Importa as telas 
import TelaGerenciamentoADM from '../screens/admin/TelaGerenciamentoADM';
import TelaGerenciarNoticias from '../screens/admin/TelaGerenciarNoticias';
import TelaListaNoticias from '../screens/admin/TelaListaNoticias';
import TelaAdicionarNoticia from '../screens/admin/TelaAdicionarNoticia';
import TelaEditarRemoverNoticia from '../screens/admin/TelaEditarRemoverNoticia';
import TelaEditarNoticia from '../screens/admin/TelaEditarNoticia';
// import TelaRemoverNoticia from '../screens/admin/TelaRemoverNoticia';

const PlaceholderScreen = () => null; 

export type AdminStackParamList = {
  TelaGerenciamentoADM: undefined;
  TelaGerenciarNoticias: undefined;
  TelaListaNoticias: undefined; 
  TelaAdicionarNoticia: undefined; 
  TelaEditarRemoverNoticia: { noticiaId: string };
  TelaEditarNoticia: { noticiaId: string }; 
  TelaRemoverNoticia: { noticiaId: string }; // (Futuro)
};

const Stack = createStackNavigator<AdminStackParamList>();

const AdminStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="TelaGerenciamentoADM"
    >
      
      <Stack.Screen name="TelaGerenciamentoADM" component={TelaGerenciamentoADM} />
      <Stack.Screen name="TelaGerenciarNoticias" component={TelaGerenciarNoticias} />
      <Stack.Screen name="TelaListaNoticias" component={TelaListaNoticias} />
      <Stack.Screen name="TelaAdicionarNoticia" component={TelaAdicionarNoticia} />
      <Stack.Screen name="TelaEditarRemoverNoticia" component={TelaEditarRemoverNoticia} />
      <Stack.Screen name="TelaEditarNoticia" component={TelaEditarNoticia} />
      
      {/* Placeholder para a última rota que falta */}
      <Stack.Screen name="TelaRemoverNoticia" component={PlaceholderScreen} />

    </Stack.Navigator>
  );
};

export default AdminStackNavigator;