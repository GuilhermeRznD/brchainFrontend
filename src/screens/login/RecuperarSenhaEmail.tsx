// src/screens/RecuperarSenhaEmail.tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import Logo from '../../components/Logo';
import FormInput from '../../components/FormInput';
import Button from '../../components/Button';
import { styles } from '../styles/telaLoginStyles'; 
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList }from '../../../App';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'RecuperarSenhaEmail'>;
};

const RecuperarSenhaEmail: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');

  const handleContinue = () => {
    // -----
    // Chamada da API vai aqui
    // -----
    
    // Simulação da resposta da API
    const emailExiste = true; // Mude para 'false' para testar o outro fluxo

    if (emailExiste) {
      // Navega para a tela de inserir o token
      navigation.navigate('RecuperarSenhaToken', { email: email });
    } else {
      // Navega para a tela de email não encontrado
      navigation.navigate('RecuperarSenhaEmailNaoEncontrado', { email: email });
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.card}>
        <Logo />
        <Text style={styles.title}>Recuperação de senha</Text>
        <Text style={styles.subtitle}>
          Digite o e-mail que está vinculado à sua conta para recuperar sua senha.
        </Text>

        <FormInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={{ marginTop: 10 }}>
          <Button title="Continuar" onPress={handleContinue} />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default RecuperarSenhaEmail;