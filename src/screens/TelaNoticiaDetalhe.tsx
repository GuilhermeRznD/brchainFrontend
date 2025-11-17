import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';
import { styles } from './styles/telaNoticiaDetalheStyles';
import { SafeAreaView } from 'react-native-safe-area-context';

interface NoticiaDetalhada {
  id: string;
  type: string;
  date: string;
  source: string;
  title: string;
  imageUri: string | null;
  body: string | null;
}

type DetalheScreenRouteProp = RouteProp<HomeStackParamList, 'Detalhe'>;
type DetalheScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Detalhe'>;

const TelaNoticiaDetalhe: React.FC = () => {
  const navigation = useNavigation<DetalheScreenNavigationProp>();
  const route = useRoute<DetalheScreenRouteProp>();
  const [noticia, setNoticia] = useState<NoticiaDetalhada | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { noticiaId } = route.params;

  useEffect(() => {
    // Lembre-se de usar o IP do seu PC se estiver no Expo Go
    // (ex: '10.0.2.2' para Emulador Android)
    const API_URL = `http://http://10.0.2.2:3000/api/noticias/${noticiaId}`;
    
    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Notícia não encontrada');
        }
        return response.json();
      })
      .then((data: any) => {
        const dadosFormatados: NoticiaDetalhada = {
          id: data._id,
          title: data.titulo,
          date: data.data,
          source: data.source,
          type: data.type,
          imageUri: data.imagem,
          body: data.body,
        };
        setNoticia(dadosFormatados);
      })
      .catch(error => {
        console.error("Erro ao buscar API:", error);
      })
      .finally(() => setIsLoading(false));
  }, [noticiaId]); // Roda sempre que o 'noticiaId' mudar

  if (isLoading) {
    return (
      <SafeAreaView style={styles.areaSegura}>
        <ActivityIndicator size="large" color="#004D40" style={{ marginTop: 50 }} />
      </SafeAreaView>
    );
  }
  if (!noticia) {
    return (
      <SafeAreaView style={styles.areaSegura}>
        <Text>Notícia não encontrada.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.areaSegura}>
      <ScrollView>
        {/* Cabeçalho com "Voltar" */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>News</Text>
        </View>

        {/* Conteúdo da Notícia */}
        <View style={styles.container}>
          <Text style={styles.titulo}>{noticia.title}</Text>
          <Text style={styles.info}>
            Publicado por {noticia.source} em {noticia.date}
          </Text>
          
          {/* Só mostra a imagem se ela existir */}
          {noticia.imageUri && (
            <Image source={{ uri: noticia.imageUri }} style={styles.imagem} />
          )}
          
          {/* Só mostra o corpo do texto se ele existir */}
          {noticia.body ? (
            <Text style={styles.body}>{noticia.body}</Text>
          ) : (
            <Text style={styles.body}>Não foi possível carregar o conteúdo desta matéria.</Text>
          )}
        </View>
      
        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TelaNoticiaDetalhe;