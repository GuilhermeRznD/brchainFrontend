import React, { useState } from 'react';
import { View, Text,FlatList } from 'react-native'; 
import { styles } from './styles/telaFeedNoticiasStyles';
import CardNoticia, { Noticia } from '../components/CardNoticia';
import FilterChips from '../components/FilterChips';
import { useNavigation } from '@react-navigation/native'; 
import { StackNavigationProp } from '@react-navigation/stack'; 
import { HomeStackParamList } from '../navigation/HomeStackNavigator'; 
import { SafeAreaView } from 'react-native-safe-area-context';

const dadosNoticias: Noticia[] = [
  {
    id: '1',
    type: 'Notícia',
    date: '20/05/2025',
    source: 'Gov.br',
    title: 'Ministério da Saúde descarta caso de gripe aviária...',
    imageUri: 'https://www.gov.br/saude/pt-br/assuntos/noticias/2025/maio/ministerio-da-saude-descarta-caso-de-gripe-aviaria-em-um-trabalhador-do-rio-grande-do-sul/foto-rodrigo-nunesms.png/@@images/43f87492-1ae6-40bc-8729-727e341377de.png',
    category: 'Saúde Pública',
  },
  {
    id: '2',
    type: 'Dicas de Saúde',
    date: '11/02/2025',
    source: 'Portal Drauzio Varella',
    title: 'Tomar café da manhã antes de treinar: é recomendado?',
    imageUri: 'https://portaldrauziovarella.nyc3.digitaloceanspaces.com/wp-content/uploads/2025/02/11121943/Depositphotos_291456806_XL-copia2.jpg',
    category: 'Bem-Estar',
  },
  {
    id: '3',
    type: 'Artigo',
    date: '10/01/2025',
    source: 'SciELO',
    title: 'Novos avanços na pesquisa de células-tronco',
    imageUri: 'https://unifor.br/documents/392172/562305/celulas+tronco+800+getty.png/456d3345-95cc-856e-e6aa-15bb8c937f0b?t=1708374802552',
    category: 'Pesquisa',
  },
];

const filtrosDisponiveis = ['Artigo', 'Dicas de Saúde', 'Notícia'];

type FeedScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Feed'>;

const TelaFeedNoticias: React.FC = () => {
  const [filtroAtivo, setFiltroAtivo] = useState<string>('');
  const navigation = useNavigation<FeedScreenNavigationProp>(); 
  
  
  const filtrarNoticias = dadosNoticias.filter(
    (item) => !filtroAtivo || item.type === filtroAtivo
  );

  const renderHeader = () => (
    <>
      <View style={styles.cabecalho}>
        <Text style={styles.tituloPrincipal}>News</Text>
        <Text style={styles.subtituloPrincipal}>
          Atualizações que fazem a diferença
        </Text>
      </View>
      <FilterChips
        filtroAtivo={filtroAtivo}
        setFiltroAtivo={setFiltroAtivo}
        filtros={filtrosDisponiveis} 
      />
    </>
  );

  const renderItem = ({ item }: { item: Noticia }) => (
    <CardNoticia
      item={item}
      onPress={() => navigation.navigate('Detalhe', { noticiaId: item.id })}
    />
  );

  return (
    <SafeAreaView style={styles.areaSegura}>
      {/* 5. Trocamos o ScrollView.map pelo FlatList */}
      <FlatList
        data={filtrarNoticias} // Passa os dados filtrados
        renderItem={renderItem} // Diz como renderizar cada item
        keyExtractor={(item) => item.id} // Diz qual é a ID única
        ListHeaderComponent={renderHeader} 
        ListFooterComponent={<View style={{ height: 80 }} />}
      />
    </SafeAreaView>
  );
};

export default TelaFeedNoticias;