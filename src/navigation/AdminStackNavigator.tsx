import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TelaGerenciamentoADM from '../screens/admin/TelaGerenciamentoADM';
import TelaGerenciarNoticias from '../screens/admin/TelaGerenciarNoticias';
// Vamos adicionar as outras telas do fluxo aqui
// import TelaGerenciarNoticiasADM from '../screens/admin/TelaGerenciarNoticiasADM';
// import TelaAdicionarNoticia from '../screens/admin/TelaAdicionarNoticia';
// import TelaEditarNoticia from '../screens/admin/TelaEditarNoticia';
// import TelaRemoverNoticia from '../screens/admin/TelaRemoverNoticia';

export type AdminStackParamList = {
  TelaGerenciamentoADM: undefined; 
  TelaGerenciarNoticias: undefined; 
  TelaGerenciarNoticiasADM: undefined; 
  // AdicionarNoticia: undefined;
  // EditarNoticia: { noticiaId: string };
  // RemoverNoticia: { noticiaId: string };
};

const Stack = createStackNavigator<AdminStackParamList>();

const AdminStackNavigator = () => {
  return (
    // Este stack gerencia todas as telas do modal
    <Stack.Navigator
      screenOptions={{
        headerShown: false, 
      }}
      initialRouteName="TelaGerenciamentoADM"
    >
      <Stack.Screen name="TelaGerenciamentoADM" component={TelaGerenciamentoADM} />
      <Stack.Screen name="TelaGerenciarNoticias" component={TelaGerenciarNoticias} />
      
      {/* // Novas telas serão adicionadas aqui:
      <Stack.Screen name="TelaGerenciarNoticiasADM" component={TelaGerenciarNoticiasADM} />
      <Stack.Screen name="AdicionarNoticia" component={TelaAdicionarNoticia} />
      <Stack.Screen name="EditarNoticia" component={TelaEditarNoticia} />
      <Stack.Screen name="RemoverNoticia" component={TelaRemoverNoticia} />
      */}

    </Stack.Navigator>
  );
};

export default AdminStackNavigator;