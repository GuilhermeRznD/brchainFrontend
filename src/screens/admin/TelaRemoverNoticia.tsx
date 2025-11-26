import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { AdminStackParamList } from '../../navigation/AdminStackNavigator';
import Colors from '../../constants/colors'; 
import AdminHeader from '../../components/AdminHeader';
import Button from '../../components/Button';

import { styles } from '../styles/telaRemoverNoticiaStyles';

type Props = {
  navigation: StackNavigationProp<AdminStackParamList, 'TelaRemoverNoticia'>;
  route: RouteProp<AdminStackParamList, 'TelaRemoverNoticia'>;
};

const TelaRemoverNoticia: React.FC<Props> = ({ navigation, route }) => {
  const { noticiaId } = route.params;
  const [nomeDoItem, setNomeDoItem] = useState('Carregando...');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    fetch(`http://10.0.2.2:3000/api/noticias/${noticiaId}`)
      .then(r => r.json())
      .then(data => {
        setNomeDoItem(data.titulo || 'Item sem título');
      })
      .catch(() => setNomeDoItem('Erro ao carregar nome do item'));
  }, [noticiaId]);


  const handleRemover = async () => {
    setLoading(true);
    try {
        const response = await fetch(`http://10.0.2.2:3000/api/admin/remover/${noticiaId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            Alert.alert('Sucesso', 'Notícia removida!');
            navigation.navigate('TelaListaNoticias'); 
        } else {
            Alert.alert('Erro', 'Não foi possível remover a notícia.');
        }
    } catch (error) {
        Alert.alert('Erro', 'Falha na conexão com a API.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <AdminHeader
        title="Remover Notícia"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        onMenuPress={() => {}}
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
          <TouchableOpacity onPress={() => navigation.goBack()} disabled={loading}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
          
          <Button 
            title={loading ? "Removendo..." : "Remover"}
            onPress={handleRemover} 
            variant="primary"
            style={styles.removerButton}
            disabled={loading} 
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default TelaRemoverNoticia;