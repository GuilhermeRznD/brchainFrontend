// src/screens/TelaLogin.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Button from '../components/Button';
import { styles } from './styles/telaLoginStyles';

//Componentes
import ScreenContainer from '../components/ScreenContainer';
import Logo from '../components/Logo';
import FormInput from '../components/FormInput';

const TelaLogin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);


  const handleLogin = () => {
    console.log('Login:', { email, password });
  };

  const handleRegister = () => {
    console.log('Cadastrar-se');
  };

  const handleForgotPassword = () => {
    console.log('Esqueceu a senha');
  };

  return (
    
    <ScreenContainer>
      
      <View style={styles.card}>
        
        <Logo />

        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>
          Efetue o login abaixo ou crie uma conta.
        </Text>

        {/* 4. Componente de Input (para Email) */}
        <FormInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* 5. Componente de Input (para Senha) */}
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