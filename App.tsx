import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from './src/constants/colors';

// Telas de Autenticação
import TelaLogin from './src/screens/TelaLogin';
import CadastroUsuario from './src/screens/CadastroUsuario';
import RecuperarSenhaEmail from './src/screens/RecuperarSenhaEmail';
import RecuperarSenhaEmailNaoEncontrado from './src/screens/RecuperarSenhaEmailNaoEncontrado';
import RecuperarSenhaToken from './src/screens/RecuperarSenhaToken';
import RecuperarSenhaNovaSenha from './src/screens/RecuperarSenhaNovaSenha';
import RecuperarSenhaSucesso from './src/screens/RecuperarSenhaSucesso';
import HomeStackNavigator from './src/navigation/HomeStackNavigator';
import TelaFeedNoticias from './src/screens/TelaFeedNoticias'; 
const TelaPerfil: React.FC = () => null;

// Tipos do Stack de Autenticação
export type RootStackParamList = {
  Login: undefined;
  CadastroUsuario: undefined;
  RecuperarSenhaEmail: undefined;
  RecuperarSenhaEmailNaoEncontrado: { email: string };
  RecuperarSenhaToken: { email: string };
  RecuperarSenhaNovaSenha: { email: string; token: string };
  RecuperarSenhaSucesso: undefined;
};

// Tipos do Tab (Rodapé)
export type AppTabParamList = {
  Home: undefined; 
  Feed: undefined; 
  Perfil: undefined; 
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<AppTabParamList>();


function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors.primary,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          height: 75,
          position: 'absolute',
          elevation: 0,
        },
        tabBarIcon: ({ focused }) => {
          let iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'];

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Feed') {
            iconName = focused ? 'newspaper-variant' : 'newspaper-variant-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'account' : 'account-outline';
          } else {
            iconName = 'help-circle';
          }
          return <MaterialCommunityIcons name={iconName} size={28} color="#fff" />;
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStackNavigator} 
      />
      <Tab.Screen 
        name="Feed" 
        component={TelaFeedNoticias} 
      />
      <Tab.Screen name="Perfil" component={TelaPerfil} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); //mudar para false para ver o login

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <AppTabs />
      ) : (
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Login"
        >
          <Stack.Screen name="Login" component={TelaLogin} />
          <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} />
          <Stack.Screen name="RecuperarSenhaEmail" component={RecuperarSenhaEmail} />
          <Stack.Screen name="RecuperarSenhaEmailNaoEncontrado" component={RecuperarSenhaEmailNaoEncontrado} />
          <Stack.Screen name="RecuperarSenhaToken" component={RecuperarSenhaToken} />
          <Stack.Screen name="RecuperarSenhaNovaSenha" component={RecuperarSenhaNovaSenha} />
          <Stack.Screen name="RecuperarSenhaSucesso" component={RecuperarSenhaSucesso} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}