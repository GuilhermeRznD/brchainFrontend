import 'react-native-gesture-handler'; 
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Nossas telas
import TelaLogin from './src/screens/TelaLogin';
import RecuperarSenhaEmail from './src/screens/RecuperarSenhaEmail';
import RecuperarSenhaEmailNaoEncontrado from './src/screens/RecuperarSenhaEmailNaoEncontrado';
import RecuperarSenhaToken from './src/screens/RecuperarSenhaToken';
import RecuperarSenhaNovaSenha from './src/screens/RecuperarSenhaNovaSenha';
import RecuperarSenhaSucesso from './src/screens/RecuperarSenhaSucesso';
import CadastroUsuario from './src/screens/CadastroUsuario';

// Nomes e parâmetros de todas as telas
export type RootStackParamList = {
  Login: undefined;
  RecuperarSenhaEmail: undefined;
  RecuperarSenhaEmailNaoEncontrado: { email: string }; // Passa o email para a próxima tela
  RecuperarSenhaToken: { email: string }; // Passa o email para a próxima tela
  RecuperarSenhaNovaSenha: { email: string; token: string }; // Passa o email e o token
  RecuperarSenhaSucesso: undefined;
  CadastroUsuario: undefined;
};


const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        
        screenOptions={{ headerShown: false }}
        
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={TelaLogin} />
        <Stack.Screen name="RecuperarSenhaEmail" component={RecuperarSenhaEmail} />
        <Stack.Screen name="RecuperarSenhaEmailNaoEncontrado" component={RecuperarSenhaEmailNaoEncontrado} />
        <Stack.Screen name="RecuperarSenhaToken" component={RecuperarSenhaToken} />
        <Stack.Screen name="RecuperarSenhaNovaSenha" component={RecuperarSenhaNovaSenha} />
        <Stack.Screen name="RecuperarSenhaSucesso" component={RecuperarSenhaSucesso} />
        <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}