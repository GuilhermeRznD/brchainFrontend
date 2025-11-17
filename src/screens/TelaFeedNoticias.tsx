import React, { useState, useEffect } from 'react';
import { View, Text,FlatList, ActivityIndicator } from 'react-native'; 
import { styles } from './styles/telaFeedNoticiasStyles';
import CardNoticia, { Noticia } from '../components/CardNoticia';
import FilterChips from '../components/FilterChips';
import { useNavigation } from '@react-navigation/native'; 
import { StackNavigationProp } from '@react-navigation/stack'; 
import { HomeStackParamList } from '../navigation/HomeStackNavigator'; 
import { SafeAreaView } from 'react-native-safe-area-context';

const filtrosDisponiveis = ['Artigo', 'Dicas de Saúde', 'Notícia'];

type FeedScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Feed'>;

const TelaFeedNoticias: React.FC = () => {
  const [filtroAtivo, setFiltroAtivo] = useState<string>('');
  const navigation = useNavigation<FeedScreenNavigationProp>(); 
  const [isLoading, setIsLoading] = useState(true);
  const [noticiasCompletas, setNoticiasCompletas] = useState<Noticia[]>([]);

  useEffect(() => {
    // Se estiver usando Expo Go utilize o ip do seu computador como 'localhost'
    // Se estiver usando o Emulador Android, o 'localhost' é '10.0.2.2'
    // Se for Emulador iOS, use 'http://localhost:3000/api/noticias'
    fetch('http://10.0.2.2:3000/api/noticias') 
      .then(response => response.json())
      .then((data) => {
         const dadosFormatados = data.map((item: any) => ({
            id: item._id,
            title: item.titulo,
            date: item.data,
            source: item.source,  
            type: item.type,     
            imageUri: item.imagem,
            }));
         setNoticiasCompletas(dadosFormatados);
      })
      .catch(error => {
        console.error("Erro ao buscar API:", error);
      })
      .finally(() => setIsLoading(false)); // Para o 'loading'
  }, []); // O array vazio [] faz isso rodar apenas 1 vez

  const filtrarNoticias = noticiasCompletas.filter(
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

  if (isLoading) {
    return (
      <SafeAreaView style={styles.areaSegura}>
        <ActivityIndicator size="large" color="#004D40" style={{ marginTop: 50 }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.areaSegura}>
      <FlatList
        data={filtrarNoticias}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader} 
        ListFooterComponent={<View style={{ height: 80 }} />}
      />
    </SafeAreaView>
  );
};

export default TelaFeedNoticias;