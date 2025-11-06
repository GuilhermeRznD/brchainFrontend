import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { AdminStackParamList } from '../../navigation/AdminStackNavigator';
import AdminHeader from '../../components/AdminHeader';
import Button from '../../components/Button';
import { styles } from '../styles/telaEditarRemoverStyles';

// Dados de exemplo (para simular a busca do nome do item)
const dadosNoticiasPublicadas = [
  { id: '1', title: 'Ministério da Saúde descarta caso...' },
  { id: '2', title: 'Tomar café da manhã antes de treinar...' },
  { id: '3', title: 'Novos avanços na pesquisa de células-tronco' },
];

type Props = {
  navigation: StackNavigationProp<AdminStackParamList, 'TelaEditarRemoverNoticia'>;
  route: RouteProp<AdminStackParamList, 'TelaEditarRemoverNoticia'>;
};

const TelaEditarRemoverNoticia: React.FC<Props> = ({ navigation, route }) => {

  const { noticiaId } = route.params;
  const item = dadosNoticiasPublicadas.find(n => n.id === noticiaId);
  const nomeDoItem = item ? item.title : 'Item não encontrado';

  const handleEditar = () => {
    navigation.navigate('TelaEditarNoticia', { noticiaId });
  };

  const handleRemover = () => {
    navigation.navigate('TelaRemoverNoticia', { noticiaId });
  };

  return (
    <View style={styles.container}>
      <AdminHeader
        title="Editar/Remover Notícia"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        onMenuPress={() => console.log('Abrir menu lateral')}
      />
      
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.subtitle}>
          Você deseja editar ou remover este item?
        </Text>

        <View style={styles.itemBox}>
          <Text style={styles.itemText}>{nomeDoItem}</Text>
        </View>

        {/* Botões de Ação */}
        <View style={styles.buttonContainer}>
          <Button 
            title="Editar" 
            onPress={handleEditar} 
            variant="primary"
            style={styles.button}
          />
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

export default TelaEditarRemoverNoticia;