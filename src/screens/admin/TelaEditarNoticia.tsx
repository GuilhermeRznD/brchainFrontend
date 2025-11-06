import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { AdminStackParamList } from '../../navigation/AdminStackNavigator';
import AdminHeader from '../../components/AdminHeader';
import FormInput from '../../components/FormInput';
import Button from '../../components/Button';


import { styles } from '../styles/telaAdicionarNoticiaStyles';

// Dados de exemplo (simulando nosso "banco de dados")
const dadosNoticiasPublicadas = [
  { id: '1', title: 'Ministério da Saúde descarta caso...', descricao: 'O Ministério da Saúde informa que...', link: 'https://gov.br/1', categoria: 'Notícia', imagemUrl: 'https://...image.png' },
  { id: '2', title: 'Tomar café da manhã antes de treinar...', descricao: 'O café da manhã é a refeição...', link: 'https://drauzio.com/2', categoria: 'Dicas de Saúde', imagemUrl: 'https://...image.jpg' },
  { id: '3', title: 'Novos avanços na pesquisa de células-tronco', descricao: 'Pesquisas recentes...', link: 'https://scielo.org/3', categoria: 'Artigo', imagemUrl: 'https://...image.png' },
];

type Props = {
  navigation: StackNavigationProp<AdminStackParamList, 'TelaEditarNoticia'>;
  route: RouteProp<AdminStackParamList, 'TelaEditarNoticia'>;
};

const TelaEditarNoticia: React.FC<Props> = ({ navigation, route }) => {
  const { noticiaId } = route.params;

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [link, setLink] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');

  useEffect(() => {
    // Simula uma busca na API/banco de dados
    const noticiaParaEditar = dadosNoticiasPublicadas.find(n => n.id === noticiaId);
    
    if (noticiaParaEditar) {
      setTitulo(noticiaParaEditar.title);
      setDescricao(noticiaParaEditar.descricao);
      setLink(noticiaParaEditar.link);
      setCategoria(noticiaParaEditar.categoria);
      setImagemUrl(noticiaParaEditar.imagemUrl);
    }
  }, [noticiaId]); // Roda sempre que o 'noticiaId' mudar

  const handleAtualizar = () => {
    if (!titulo || !descricao) {
      Alert.alert('Erro', 'Título e Descrição são obrigatórios.');
      return;
    }
    
    // Lógica de API (Simulada)
    console.log('Atualizando notícia:', noticiaId, {
      titulo,
      descricao,
      link,
      categoria,
      imagemUrl,
    });
    
    Alert.alert('Sucesso', 'Notícia atualizada!');
    navigation.goBack(); 
  };

  return (
    <View style={styles.container}>
      <AdminHeader
        title="Editar Notícia"
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
            onPress={handleAtualizar} 
            variant="primary"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default TelaEditarNoticia;