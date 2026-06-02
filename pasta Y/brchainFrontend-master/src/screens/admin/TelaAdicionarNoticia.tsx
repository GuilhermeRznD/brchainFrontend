import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
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
  const [loading, setLoading] = useState(false);

  const handleSalvar = async () => {
    if (!titulo || !descricao) {
      Alert.alert('Erro', 'Título e Descrição são obrigatórios.');
      return;
    }
    
    setLoading(true);
    try {
        await fetch('http://10.0.2.2:3000/api/admin/adicionar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                titulo: titulo,
                body: descricao,
                url: link,
                type: categoria || 'Notícia',
                imagem: imagemUrl
            })
        });
        Alert.alert('Sucesso', 'Notícia adicionada!');
        navigation.goBack();
    } catch (error) {
        Alert.alert('Erro', 'Falha ao salvar notícia.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <AdminHeader
        title="Adicionar Notícia"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        onMenuPress={() => {}}
      />
      <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 100 }}>
        <FormInput label="Título" value={titulo} onChangeText={setTitulo} />
        <FormInput 
            label="Descrição (Corpo)" 
            value={descricao} 
            onChangeText={setDescricao} 
            multiline={true} 
            numberOfLines={4} 
            style={styles.textArea} 
        />
        <FormInput label="Link Original" value={link} onChangeText={setLink} />
        <FormInput label="Categoria" value={categoria} onChangeText={setCategoria} placeholder="Ex: Saúde, Dicas" />
        <FormInput label="URL da Imagem" value={imagemUrl} onChangeText={setImagemUrl} />
        
        <View style={styles.footerButtons}>
          <Button title="Cancelar" onPress={() => navigation.goBack()} variant="secondary" />
          <Button title={loading ? "Salvando..." : "Salvar"} onPress={handleSalvar} variant="primary" disabled={loading} />
        </View>
      </ScrollView>
    </View>
  );
};

export default TelaAdicionarNoticia;