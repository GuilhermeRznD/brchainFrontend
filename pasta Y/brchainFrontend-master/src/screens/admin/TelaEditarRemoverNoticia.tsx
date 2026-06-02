import React from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { AdminStackParamList } from '../../navigation/AdminStackNavigator';
import AdminHeader from '../../components/AdminHeader';
import Button from '../../components/Button';
import { styles } from '../styles/telaRemoverNoticiaStyles';

type Props = {
  navigation: StackNavigationProp<AdminStackParamList, 'TelaEditarRemoverNoticia'>;
  route: RouteProp<AdminStackParamList, 'TelaEditarRemoverNoticia'>;
};

const TelaEditarRemoverNoticia: React.FC<Props> = ({ navigation, route }) => {
  const { noticiaId } = route.params;

  const handleRemover = async () => {
    try {
        await fetch(`http://10.0.2.2:3000/api/admin/remover/${noticiaId}`, {
            method: 'DELETE',
        });
        Alert.alert('Sucesso', 'Notícia removida!');
        navigation.pop(2); 
    } catch (error) {
        Alert.alert('Erro', 'Falha ao remover.');
    }
  };

  return (
    <View style={styles.container}>
      <AdminHeader title="Remover Notícia" showBackButton={true} onBackPress={() => navigation.goBack()} onMenuPress={() => {}} />
      
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.warningText}>Tem certeza que deseja deletar esta notícia? A ação é irreversível.</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.cancelText}>Cancelar</Text></TouchableOpacity>
          <Button title="Remover" onPress={handleRemover} variant="primary" style={styles.removerButton} />
        </View>
      </ScrollView>
    </View>
  );
};

export default TelaEditarRemoverNoticia;