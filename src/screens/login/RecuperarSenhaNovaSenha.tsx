// src/screens/RecuperarSenhaNovaSenha.tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import Logo from '../../components/Logo';
import FormInput from '../../components/FormInput';
import Button from '../../components/Button';
import { styles } from '../styles/telaLoginStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../../App';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList , 'RecuperarSenhaNovaSenha'>;
};

const RecuperarSenhaNovaSenha: React.FC<Props> = ({ navigation }) => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);

  const handleConfirm = () => {
    if (password !== confirmPassword) {
      console.log('As senhas não conferem');
      return;
    }
    // -----
    // Chamada de API vai aqui
    // -----
    
    // Simulação
    console.log('Senha alterada com sucesso!');
    navigation.navigate('RecuperarSenhaSucesso');
  };

  return (
    <ScreenContainer>
      <View style={styles.card}>
        <Logo />
        <Text style={styles.title}>Recuperação de senha</Text>
        <Text style={styles.subtitle}>Crie uma nova senha para sua conta.</Text>

        <FormInput
          placeholder="Nova senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPass}
          iconName={showPass ? 'eye-off' : 'eye'}
          onIconPress={() => setShowPass(!showPass)}
        />
        <FormInput
          placeholder="Confirme sua senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPass}
          iconName={showConfirmPass ? 'eye-off' : 'eye'}
          onIconPress={() => setShowConfirmPass(!showConfirmPass)}
        />

        <View style={{ marginTop: 10 }}>
          <Button title="Confirmar" onPress={handleConfirm} />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default RecuperarSenhaNovaSenha;