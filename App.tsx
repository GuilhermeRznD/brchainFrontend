import 'react-native-gesture-handler';
import React from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from './src/constants/colors';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from './src/context/AuthContext';

// Telas de Autenticação
import TelaLogin from './src/screens/TelaLogin';
import CadastroUsuario from './src/screens/CadastroUsuario';
import RecuperarSenhaEmail from './src/screens/RecuperarSenhaEmail';
import RecuperarSenhaEmailNaoEncontrado from './src/screens/RecuperarSenhaEmailNaoEncontrado';
import RecuperarSenhaToken from './src/screens/RecuperarSenhaToken';
import RecuperarSenhaNovaSenha from './src/screens/RecuperarSenhaNovaSenha';
import RecuperarSenhaSucesso from './src/screens/RecuperarSenhaSucesso';

// Telas Principais (App)
import HomeStackNavigator from './src/navigation/HomeStackNavigator';
import TelaFeedNoticias from './src/screens/TelaFeedNoticias';
import TelaPerfil from './src/screens/TelaPerfil';

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

// Navegador de Abas (Bottom Tab)
function AppTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors.primary,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          height: 80, 
          position: 'absolute',
          elevation: 0,
          paddingBottom: insets.bottom,
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
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Feed" component={TelaFeedNoticias} />
      <Tab.Screen name="Perfil" component={TelaPerfil} />
    </Tab.Navigator>
  );
}

// NOVO COMPONENTE para decidir qual fluxo mostrar
const RootNavigator: React.FC = () => {
  // Pega o estado do Contexto, não mais de um 'useState' local
  const { isLoggedIn, login } = useAuth();

  // --- SIMULAÇÃO DE LOGIN ---
  // Para fins de teste, fazemos login como admin ao carregar o app
  React.useEffect(() => {
    login({ id: '1', nome: 'Guilherme (Admin)', email: 'guilherme@brchain.com',role: 'admin', });
    // Para testar como usuário normal, comente o login de admin e descomente este:
    
    //login({  id: '2', nome: 'Usuário Comum', email: 'user@brchain.com', role: 'user' });
  }, []);

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


export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}