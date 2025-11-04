import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import ScreenContainer from '../components/ScreenContainer';
import Logo from '../components/Logo';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { styles } from './styles/telaLoginStyles';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'CadastroUsuario'>;
};

const CadastroUsuario: React.FC<Props> = ({ navigation }) => {
  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [telefone, setTelefone] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [confirmarSenha, setConfirmarSenha] = useState<string>('');

  const [showSenha, setShowSenha] = useState<boolean>(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState<boolean>(false);

  const handleCadastro = () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não conferem.');
      return;
    }

    //Lógica de API (simulada por enquanto)
    console.log('Dados do Cadastro:', { nome, email, telefone, senha });

    // -----
    // Chamada de API vai aqui
    // -----

    // Simular sucesso e ir para o Login 
    Alert.alert(
      'Sucesso!',
      'Sua conta foi criada. Faça o login para continuar.',
    );
    navigation.navigate('Login');
  };

  return (
    <ScreenContainer>
      <View style={styles.card}>
        <Logo />

        <Text style={styles.title}>Cadastro</Text>
        <Text style={styles.subtitle}>
          Crie uma conta no aplicativo da BRChain e acompanhe as novidades.
        </Text>

        <FormInput
          label="Nome"
          value={nome}
          onChangeText={setNome}
          autoCapitalize="words"
        />

        <FormInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <FormInput
          label="Telefone (Opcional)"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />

        <FormInput
          label="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={!showSenha}
          iconName={showSenha ? 'eye-off' : 'eye'}
          onIconPress={() => setShowSenha(!showSenha)}
        />

        <FormInput
          label="Confirme sua senha"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry={!showConfirmarSenha}
          iconName={showConfirmarSenha ? 'eye-off' : 'eye'}
          onIconPress={() => setShowConfirmarSenha(!showConfirmarSenha)}
        />

        <View style={{ marginTop: 10 }}>
          <Button title="Continuar" onPress={handleCadastro} />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default CadastroUsuario;