// src/screens/RecuperarSenhaToken.tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Logo from '../components/Logo';
import Button from '../components/Button';
import { styles } from './styles/telaLoginStyles';
import TokenInput from '../components/TokenInput'; 
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'RecuperarSenhaToken'>;
  route: RouteProp<RootStackParamList, 'RecuperarSenhaToken'>;
};

const RecuperarSenhaToken: React.FC<Props> = ({ navigation, route }) => {
  const { email } = route.params;
  const [token, setToken] = useState<string>('');

  const handleContinue = () => {
    // -----
    // Chamada de API vai aqui
    // -----
    
    // Simulação
    const tokenCorreto = true;
    if (tokenCorreto) {
      navigation.navigate('RecuperarSenhaNovaSenha', { email, token });
    } else {
      // Mostrar uma mensagem de erro (token inválido)
      console.log('Token inválido');
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.card}>
        <Logo />
        <Text style={styles.title}>Recuperação de senha</Text>
        <Text style={styles.subtitle}>
          Um token foi enviado para o seu email para a recuperação de senha.
          {'\n'}Digite o código abaixo:
        </Text>

        <TokenInput code={token} setCode={setToken} />

        <Button title="Continuar" onPress={handleContinue} />
      </View>
    </ScreenContainer>
  );
};

export default RecuperarSenhaToken;