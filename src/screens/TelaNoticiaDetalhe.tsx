import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';
import { styles } from './styles/telaNoticiaDetalheStyles';
import { SafeAreaView } from 'react-native-safe-area-context';

// Dados de exemplo (futuramente seria buscado 1 item da API aqui)
const dadosNoticias = [
  { id: '1', type: 'Notícia', date: '20/05/2025', source: 'Gov.br', title: 'Ministério da Saúde descarta caso de gripe aviária...', imageUri: 'https://s2.glbimg.com/xHe-E-RZe-11G-C-k-vYw-xP_0I=/0x0:1080x720/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2023/5/U/oPZzClT02FkFAS6MGnCA/gripe-aviaria-gov-rs.jpg', body: 'O Ministério da Saúde informa que foi descartado o caso suspeito de Influenza Aviária em um trabalhador da granja do município de Montenegro (RS), onde foi identificado foco da doença em aves.' },
  { id: '2', type: 'Dicas de Saúde', date: '11/02/2025', source: 'Portal Drauzio Varella', title: 'Tomar café da manhã antes de treinar: é recomendado?', imageUri: 'https://classic.exame.com/wp-content/uploads/2016/09/size_960_16_9_cafe-da-manha-saudavelj.jpg', body: 'O café da manhã é a refeição mais importante do dia, mas será que é bom treinar depois de comer? especialistas explicam...' },
  { id: '3', type: 'Artigo', date: '10/01/2025', source: 'SciELO', title: 'Novos avanços na pesquisa de células-tronco', imageUri: 'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2021/08/celula-tronco-e1629474943372.jpg', body: 'Pesquisas recentes publicadas na revista Nature indicam que...' },
];

type DetalheScreenRouteProp = RouteProp<HomeStackParamList, 'Detalhe'>;
type DetalheScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Detalhe'>;

const TelaNoticiaDetalhe: React.FC = () => {
  const navigation = useNavigation<DetalheScreenNavigationProp>();
  const route = useRoute<DetalheScreenRouteProp>();

  // Pega o ID passado pela navegação
  const { noticiaId } = route.params;

  // Simulação de "Fetch": Encontra a notícia no array de dados
  const noticia = dadosNoticias.find(item => item.id === noticiaId);

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
            Publicado por {noticia.source} em {noticia.date} 17h20
          </Text>
          
          <Image source={{ uri: noticia.imageUri }} style={styles.imagem} />
          
          <Text style={styles.body}>{noticia.body}</Text>
          <Text style={styles.body}>
            Fiocruz confirmou na tarde desta terça-feira (20) que o teste para a doença deu negativo.
          </Text>
          <Text style={styles.body}>
            O Ministério da Saúde, junto com a Secretaria de Estado de Saúde do Rio Grande do Sul, monitora todas as pessoas que podem ter sido expostas ao vírus por
          </Text>
        </View>
        
        {/* Espaço para o rodapé não cobrir o texto */}
        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TelaNoticiaDetalhe;