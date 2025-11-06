import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Importa as telas 
import TelaGerenciamentoADM from '../screens/admin/TelaGerenciamentoADM';
import TelaGerenciarNoticias from '../screens/admin/TelaGerenciarNoticias';
import TelaListaNoticias from '../screens/admin/TelaListaNoticias';
import TelaAdicionarNoticia from '../screens/admin/TelaAdicionarNoticia';

// Um componente vazio para as rotas que ainda não existem
const PlaceholderScreen = () => null; 


export type AdminStackParamList = {
  TelaGerenciamentoADM: undefined;
  TelaGerenciarNoticias: undefined;
  TelaListaNoticias: undefined; 
  TelaAdicionarNoticia: undefined; 
  TelaEditarRemoverNoticia: { noticiaId: string }; // (Futuro)
  TelaEditarNoticia: { noticiaId: string }; // (Futuro)
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
      
      {/* Placeholders para as rotas futuras*/}
      <Stack.Screen name="TelaEditarRemoverNoticia" component={PlaceholderScreen} />
      <Stack.Screen name="TelaEditarNoticia" component={PlaceholderScreen} />
      <Stack.Screen name="TelaRemoverNoticia" component={PlaceholderScreen} />

    </Stack.Navigator>
  );
};

export default AdminStackNavigator;