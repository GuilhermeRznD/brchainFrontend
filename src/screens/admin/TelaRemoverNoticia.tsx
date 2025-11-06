import React from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { AdminStackParamList } from '../../navigation/AdminStackNavigator';
import Colors from '../../constants/colors'; 
import AdminHeader from '../../components/AdminHeader';
import Button from '../../components/Button';

import { styles } from '../styles/telaRemoverNoticiaStyles';

// Dados de exemplo (para simular a busca do nome do item)
const dadosNoticiasPublicadas = [
  { id: '1', title: 'Ministério da Saúde descarta caso...' },
  { id: '2', title: 'Tomar café da manhã antes de treinar...' },
  { id: '3', title: 'Novos avanços na pesquisa de células-tronco' },
];

type Props = {
  navigation: StackNavigationProp<AdminStackParamList, 'TelaRemoverNoticia'>;
  route: RouteProp<AdminStackParamList, 'TelaRemoverNoticia'>;
};

const TelaRemoverNoticia: React.FC<Props> = ({ navigation, route }) => {
  // 1. Pegamos o ID do item
  const { noticiaId } = route.params;

  // 2. Simulamos a busca pelo nome
  const item = dadosNoticiasPublicadas.find(n => n.id === noticiaId);
  const nomeDoItem = item ? item.title : 'Item não encontrado';

  const handleRemover = () => {
    // Lógica de API (Simulada)
    console.log('Removendo notícia:', noticiaId);
    
    Alert.alert('Sucesso', 'Notícia removida!');
    
    // 3. Volta para a lista de notícias (TelaListaNoticias)
    
    navigation.navigate('TelaListaNoticias');
  };

  return (
    <View style={styles.container}>
      <AdminHeader
        title="Remover Notícia"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        onMenuPress={() => console.log('Abrir menu lateral')}
      />
      
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
        {/* Caixa de preview do item */}
        <View style={styles.itemBox}>
          <Text style={styles.itemText}>{nomeDoItem}</Text>
        </View>

        {/* Texto de Confirmação */}
        <Text style={styles.warningText}>
          Você tem certeza que deseja deletar esse produto?
          Essa ação é irreversível
        </Text>

        {/* Botões de Ação */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
          
          <Button 
            title="Remover" 
            onPress={handleRemover} 
            variant="primary"
            style={styles.removerButton} 
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default TelaRemoverNoticia;