import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';
import Button from '../components/Button';
import { styles } from './styles/telaLoginStyles';
import ScreenContainer from '../components/ScreenContainer';
import Logo from '../components/Logo';
import FormInput from '../components/FormInput';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App'; 

// Define o tipo de navegação para esta tela
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const TelaLogin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigation = useNavigation<LoginScreenNavigationProp>();
  const handleLogin = () => {
    console.log('Login:', { email, password });
  };

  const handleRegister = () => {
    navigation.navigate('CadastroUsuario');
  };

  const handleForgotPassword = () => {
    navigation.navigate('RecuperarSenhaEmail');
  };

  return (
    <ScreenContainer>
      <View style={styles.card}>
        <Logo />
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>
          Efetue o login abaixo ou crie uma conta.
        </Text>

        <FormInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <FormInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          iconName={showPassword ? 'eye-off' : 'eye'}
          onIconPress={() => setShowPassword(!showPassword)}
        />

        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={handleForgotPassword}
        >
          <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <Button title="Login" onPress={handleLogin} />
        <Button
          title="Cadastre-se"
          onPress={handleRegister} 
          variant="secondary"
        />
      </View>
    </ScreenContainer>
  );
};

export default TelaLogin;