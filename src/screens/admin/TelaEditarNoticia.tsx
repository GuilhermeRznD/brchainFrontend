import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { AdminStackParamList } from '../../navigation/AdminStackNavigator';
import AdminHeader from '../../components/AdminHeader';
import FormInput from '../../components/FormInput';
import Button from '../../components/Button';
import { styles } from '../styles/telaAdicionarNoticiaStyles'; // Reusa estilos

type Props = {
  navigation: StackNavigationProp<AdminStackParamList, 'TelaEditarNoticia'>;
  route: RouteProp<AdminStackParamList, 'TelaEditarNoticia'>;
};

const TelaEditarNoticia: React.FC<Props> = ({ navigation, route }) => {
  const { noticiaId } = route.params;
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      fetch(`http://10.0.2.2:3000/api/noticias/${noticiaId}`)
        .then(r => r.json())
        .then(data => {
            setTitulo(data.titulo);
            setDescricao(data.body);
            setImagemUrl(data.imagem);
        });
  }, [noticiaId]);

  const handleAtualizar = async () => {
    setLoading(true);
    try {
        await fetch(`http://10.0.2.2:3000/api/admin/editar/${noticiaId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                titulo: titulo,
                body: descricao,
                imagem: imagemUrl
            })
        });
        Alert.alert('Sucesso', 'Notícia atualizada!');
        navigation.pop(2); 
    } catch (error) {
        Alert.alert('Erro', 'Falha ao atualizar.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <AdminHeader title="Editar Notícia" showBackButton={true} onBackPress={() => navigation.goBack()} onMenuPress={() => {}} />
      
      <ScrollView style={styles.scrollContainer}>
        <FormInput label="Título" value={titulo} onChangeText={setTitulo} />
        <FormInput label="Descrição" value={descricao} onChangeText={setDescricao} multiline={true} style={styles.textArea} />
        <FormInput label="URL da Imagem" value={imagemUrl} onChangeText={setImagemUrl} />
        
        <View style={styles.footerButtons}>
          <Button title="Cancelar" onPress={() => navigation.goBack()} variant="secondary" />
          <Button title={loading ? "Salvando..." : "Salvar"} onPress={handleAtualizar} variant="primary" disabled={loading} />
        </View>
      </ScrollView>
    </View>
  );
};

export default TelaEditarNoticia;