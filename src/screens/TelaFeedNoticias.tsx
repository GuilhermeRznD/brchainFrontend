// src/screens/TelaFeedNoticias.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles/telaFeedNoticiasStyles'; 
import CardNoticia, { Noticia } from '../components/CardNoticia';
import FilterChips from '../components/FilterChips';


// Dados de exemplo
const dadosNoticias: Noticia[] = [
  {
    id: '1',
    type: 'Notícia',
    date: '20/05/2025',
    source: 'Gov.br',
    title: 'Ministério da Saúde descarta caso de gripe aviária...',
    imageUri: 'https://img.odcdn.com.br/wp-content/uploads/2025/07/gripe_aviaria-1920x1080.jpg',
    category: 'Saúde Pública',
  },
  {
    id: '2',
    type: 'Dicas de Saúde',
    date: '11/02/2025',
    source: 'Portal Drauzio Varella',
    title: 'Tomar café da manhã antes de treinar: é recomendado?',
    imageUri: 'https://s2-ge.glbimg.com/q7DEEhGBtb9I483gx1-h5ZC2Jhw=/0x0:2121x1414/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2025/f/Y/i9IQlWSlymHxkIq9ysgA/istock-1999518057.jpg',
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

const TelaFeedNoticias: React.FC = () => {
  const [filtroAtivo, setFiltroAtivo] = useState<string>('');

  const filtrarNoticias = dadosNoticias.filter(
    (item) => !filtroAtivo || item.type === filtroAtivo
  );

  return (
    <SafeAreaView style={styles.areaSegura}>
      <ScrollView style={styles.scrollView}>
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

        {filtrarNoticias.map((item) => (
          <CardNoticia
            key={item.id}
            item={item}
            onPress={() => console.log('Navegar para notícia:', item.title)}
          />
        ))}
        {/* Espaço extra para não cortar o último card no rodapé */}
        <View style={{ height: 80 }} /> 
      </ScrollView>
    </SafeAreaView>
  );
};

export default TelaFeedNoticias;