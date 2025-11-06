import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AdminStackParamList } from '../../navigation/AdminStackNavigator';
import AdminHeader from '../../components/AdminHeader';
import FormInput from '../../components/FormInput';
import Button from '../../components/Button';
import { styles } from '../styles/telaAdicionarNoticiaStyles';

type Props = {
  navigation: StackNavigationProp<AdminStackParamList, 'TelaAdicionarNoticia'>;
};

const TelaAdicionarNoticia: React.FC<Props> = ({ navigation }) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [link, setLink] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');

  const handleSalvar = () => {
    if (!titulo || !descricao) {
      Alert.alert('Erro', 'Título e Descrição são obrigatórios.');
      return;
    }
    
    console.log('Salvando nova notícia:', { titulo, descricao, link, categoria, imagemUrl });
    Alert.alert('Sucesso', 'Notícia adicionada!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <AdminHeader
        title="Adicionar Notícia"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        onMenuPress={() => console.log('Abrir menu lateral')}
      />
      
      <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 100 }}>
        <FormInput
          label="Título Da Notícia"
          value={titulo}
          onChangeText={setTitulo}
        />
        <FormInput
          label="Descrição"
          value={descricao}
          onChangeText={setDescricao}
          multiline={true}
          numberOfLines={4}
          style={styles.textArea}
        />
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <FormInput
              label="Link (?)"
              value={link}
              onChangeText={setLink}
            />
          </View>
          <View style={styles.halfWidth}>
            <FormInput
              label="Categoria(s)"
              value={categoria}
              onChangeText={setCategoria}
            />
          </View>
        </View>
        <FormInput
          label="Imagem Do Produto (URL)"
          value={imagemUrl}
          onChangeText={setImagemUrl}
        />
        <View style={styles.footerButtons}>
          <Button 
            title="Cancelar" 
            onPress={() => navigation.goBack()} 
            variant="secondary"
          />
          <Button 
            title="Salvar" 
            onPress={handleSalvar} 
            variant="primary"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default TelaAdicionarNoticia;