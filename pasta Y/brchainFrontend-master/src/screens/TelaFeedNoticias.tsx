import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';
import { styles } from './styles/telaFeedNoticiasStyles';
import CardNoticia, { Noticia } from '../components/CardNoticia';
import FilterChips from '../components/FilterChips';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/colors';
import { buildUrl, ENDPOINTS } from '../constants/api';

// Chips do topo agora filtram por TOPICO (e nao categoria).
// Devem casar com os topicos hardcoded no ApprovalModal do Dashboard.
const filtrosDisponiveis = [
  'Nutrição',
  'Exercícios',
  'Saúde Mental',
  'Prevenção',
  'Bem-estar',
];

type FeedScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Feed'>;

type ApiArticle = {
  id: string;
  title: string | null;
  description: string | null;
  url: string | null;
  image: string | null;
  source_name: string | null;
  published_at: string | null;
  category_admin: string | null;
  topic: string | null;
  dominant_category: string;
  status: string;
};

function formatarData(iso: string | null | undefined): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('pt-BR');
}

const TelaFeedNoticias: React.FC = () => {
  const [filtroAtivo, setFiltroAtivo] = useState<string>('');
  const navigation = useNavigation<FeedScreenNavigationProp>();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [noticias, setNoticias] = useState<Noticia[]>([]);

  const buscarNoticias = useCallback(
    async (categoria?: string, modo: 'inicial' | 'refresh' = 'inicial') => {
      if (modo === 'inicial') setIsLoading(true);
      else setIsRefreshing(true);
      setErrorMsg(null);

      try {
        const url = buildUrl(ENDPOINTS.publicArticles, {
          topic: categoria || undefined,
          limit: 50,
        });

        const response = await fetch(url, {
          method: 'GET',
          headers: { Accept: 'application/json' },
        });

        if (!response.ok) {
          throw new Error(`Resposta inesperada da API (${response.status}).`);
        }

        const data: { items: ApiArticle[] } = await response.json();

        const formatadas: Noticia[] = (data.items || []).map((item) => ({
          id: item.id,
          title: item.title || 'Sem título',
          date: formatarData(item.published_at),
          source: item.source_name || 'Fonte desconhecida',
          // Tag colorida do card agora reflete o TOPICO (chip de cima).
          // Cai pra categoria caso o admin nao tenha definido topico.
          type: item.topic || item.category_admin || 'Geral',
          category: item.category_admin || item.dominant_category || 'Geral',
          imageUri: item.image || null,
        }));

        setNoticias(formatadas);
      } catch (err) {
        setErrorMsg(
          err instanceof Error
            ? err.message
            : 'Falha de rede ao buscar notícias. Verifique sua conexão e a URL da API.'
        );
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    []
  );

  // Rebusca sempre que a tela ganha foco — garante refresh em tempo real
  // ao voltar da tela de detalhe ou ao alternar entre abas Home/Feed.
  useFocusEffect(
    useCallback(() => {
      buscarNoticias(filtroAtivo);
    }, [filtroAtivo, buscarNoticias])
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
        {renderHeader()}
        <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 50 }} />
      </SafeAreaView>
    );
  }

  if (errorMsg) {
    return (
      <SafeAreaView style={styles.areaSegura}>
        {renderHeader()}
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text style={{ color: '#B71C1C', fontWeight: 'bold', marginBottom: 8, textAlign: 'center' }}>
            Não foi possível carregar o feed.
          </Text>
          <Text style={{ color: '#666', marginBottom: 16, textAlign: 'center' }}>{errorMsg}</Text>
          <TouchableOpacity
            onPress={() => buscarNoticias(filtroAtivo)}
            style={{
              backgroundColor: Colors.primary,
              paddingVertical: 10,
              paddingHorizontal: 24,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.areaSegura}>
      <FlatList
        data={noticias}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <View style={{ paddingHorizontal: 20, paddingVertical: 30 }}>
            <Text style={{ color: '#666', textAlign: 'center' }}>
              Nenhuma notícia aprovada para {filtroAtivo || 'esta seleção'}.
            </Text>
          </View>
        }
        ListFooterComponent={<View style={{ height: 80 }} />}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => buscarNoticias(filtroAtivo, 'refresh')}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }
      />
    </SafeAreaView>
  );
};

export default TelaFeedNoticias;
