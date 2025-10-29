import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView,} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import Button from '../components/Button';
import { styles } from './styles/telaLoginStyles';

const TelaLogin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailFocado, setEmailFocado] = useState<boolean>(false);
  const [passwordFocado, setPasswordFocado] = useState<boolean>(false);

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
    <LinearGradient
      colors={['#E8F5E9', '#A5D6A7']}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.container}>
              <View style={styles.card}>
                <Image
                  source={require('../../assets/brchain-logo.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />

                <Text style={styles.title}>Login</Text>
                <Text style={styles.subtitle}>
                  Efetue o login abaixo ou crie uma conta.
                </Text>

                
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Email</Text>
                  <TextInput
                    style={[
                      styles.input,
                      { borderColor: emailFocado ? Colors.primary : '#ccc' },
                    ]}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onFocus={() => setEmailFocado(true)}
                    onBlur={() => setEmailFocado(false)}
                  />
                </View>

                
                <View style={styles.inputGroup}>
                  <View
                    style={[
                      styles.passwordContainer,
                      { borderColor: passwordFocado ? Colors.primary : '#ccc' },
                    ]}
                  >
                    <TextInput
                      style={styles.passwordInput}
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      placeholder="Senha"
                      placeholderTextColor={Colors.textSecondary}
                      onFocus={() => setPasswordFocado(true)}
                      onBlur={() => setPasswordFocado(false)}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.toggleButton}
                    >
                      <Ionicons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={22}
                        color={Colors.textSecondary}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

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
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default TelaLogin;
