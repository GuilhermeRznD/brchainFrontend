import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AdminStackParamList } from '../../navigation/AdminStackNavigator';
import Colors from '../../constants/colors';
import AdminHeader from '../../components/AdminHeader';
import SearchBar from '../../components/SearchBar';
import AdminListItem from '../../components/AdminListItem';
import { styles } from '../styles/telaListaNoticias'; 

const dadosNoticiasPublicadas = [
  { id: '1', title: 'Ministério da Saúde descarta caso...', imageUrl: 'https://www.gov.br/.../image.png' },
  { id: '2', title: 'Tomar café da manhã antes de treinar...', imageUrl: 'https://portaldrauziovarella.../image.jpg' },
  { id: '3', title: 'Novos avanços na pesquisa de células-tronco', imageUrl: 'https://unifor.br/.../image.png' },
];

type Props = {
  navigation: StackNavigationProp<AdminStackParamList, 'TelaListaNoticias'>;
};

const TelaListaNoticias: React.FC<Props> = ({ navigation }) => {
  const [busca, setBusca] = useState('');

  const noticiasFiltradas = dadosNoticiasPublicadas.filter(item =>
    item.title.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <AdminHeader
        title="Notícias Publicadas"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        onMenuPress={() => console.log('Abrir menu lateral')}
      />

      <View style={styles.contentContainer}>
        <SearchBar
          value={busca}
          onChangeText={setBusca}
        />

        <View style={styles.listHeader}>
          <Text style={styles.filterText}>Filtrar por...</Text>
          <TouchableOpacity 
            style={styles.addButton} 
            // 3. NAVEGAÇÃO CORRIGIDA
            onPress={() => navigation.navigate('TelaAdicionarNoticia')}
          >
            <MaterialCommunityIcons name="plus-circle" size={20} color={Colors.primary} />
            <Text style={styles.addButtonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={noticiasFiltradas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AdminListItem
              title={item.title}
              imageUrl={item.imageUrl} 
              onPress={() => 
                navigation.navigate('TelaEditarRemoverNoticia', { noticiaId: item.id }) 
              }
            />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhuma notícia encontrada.</Text>
          }
        />
      </View>
    </View>
  );
};

export default TelaListaNoticias;