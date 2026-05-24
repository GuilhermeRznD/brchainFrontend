// src/screens/TelaFeedNoticias.tsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import CardNoticia, { Noticia } from '../components/CardNoticia';
import FilterChips from '../components/FilterChips';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';

// ─── Configuração ─────────────────────────────────────────────────────────────

import { API_BASE, USER_ID } from '../config/api';

type FeedScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Feed'>;

// ─── Componente ───────────────────────────────────────────────────────────────

const TelaFeedNoticias: React.FC = () => {
  const navigation = useNavigation<FeedScreenNavigationProp>();

  const [filtroAtivo, setFiltroAtivo] = useState<string>('');
  const [todasNoticias, setTodasNoticias] = useState<Noticia[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // ── Busca o feed ─────────────────────────────────────────────────────────
  const buscarFeed = useCallback(async () => {
    setIsLoading(true);
    setErro(null);
    try {
      const response = await fetch(`${API_BASE}/feed/${USER_ID}`);
      if (!response.ok) throw new Error(`Erro ${response.status}`);

      const data = await response.json();

      const formatados: Noticia[] = data.items.map((item: any) => ({
        id:       item.id,
        title:    item.title ?? 'Sem título',
        date:     item.published_at
                    ? new Date(item.published_at).toLocaleDateString('pt-BR')
                    : '',
        source:   item.source_name ?? 'Fonte desconhecida',
        type:     item.dominant_category ?? 'Geral',
        imageUri: item.image ?? null,
        url:      item.url ?? '',
      }));

      setTodasNoticias(formatados);
    } catch (error: any) {
      console.error('Erro ao buscar feed:', error);
      setErro('Não foi possível carregar as notícias. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    buscarFeed();
  }, [buscarFeed]);

  // ── Filtros dinâmicos ────────────────────────────────────────────────────
  // Gerados automaticamente a partir das categorias presentes no feed.
  // useMemo garante que só recalcula quando todasNoticias mudar —
  // sem loops extras ou re-renders desnecessários.
  const filtrosDisponiveis = useMemo(() => {
    const categorias = todasNoticias.map((n) => n.type).filter(Boolean);
    return [...new Set(categorias)].sort(); // remove duplicatas e ordena A-Z
  }, [todasNoticias]);

  // ── Filtragem local ──────────────────────────────────────────────────────
  const noticiasFiltradas = useMemo(() => {
    if (!filtroAtivo) return todasNoticias;
    return todasNoticias.filter((item) => item.type === filtroAtivo);
  }, [todasNoticias, filtroAtivo]);

  // ── Sub-componentes ──────────────────────────────────────────────────────
  const renderHeader = () => (
    <View>
      <View style={styles.cabecalho}>
        <Text style={styles.tituloPrincipal}>News</Text>
        <Text style={styles.subtituloPrincipal}>
          Atualizações que fazem a diferença
        </Text>
      </View>
      <FilterChips
        filtros={filtrosDisponiveis}
        filtroAtivo={filtroAtivo}
        setFiltroAtivo={setFiltroAtivo}
      />
    </View>
  );

  const renderItem = ({ item }: { item: Noticia }) => (
    <CardNoticia
      item={item}
      onPress={() =>
        navigation.navigate('Detalhe', {
          noticiaId: item.id,
          url: item.url ?? '',
        })
      }
    />
  );

  // ── Estados de UI ────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <SafeAreaView style={styles.areaSegura}>
        {renderHeader()}
        <ActivityIndicator size="large" color="#004D40" style={{ marginTop: 50 }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.areaSegura}>
      <FlatList
        data={noticiasFiltradas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <View style={styles.centrado}>
            <Text style={styles.textoVazio}>
              {erro ?? 'Nenhuma notícia encontrada para este filtro.'}
            </Text>
          </View>
        }
        ListFooterComponent={<View style={{ height: 80 }} />}
      />
    </SafeAreaView>
  );
};

// ─── Estilos ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  areaSegura: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  cabecalho: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  tituloPrincipal: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#004D40',
  },
  subtituloPrincipal: {
    fontSize: 14,
    color: '#757575',
    marginTop: 4,
  },
  centrado: {
    alignItems: 'center',
    paddingTop: 60,
  },
  textoVazio: {
    fontSize: 14,
    color: '#9E9E9E',
    textAlign: 'center',
    paddingHorizontal: 30,
  },
});

export default TelaFeedNoticias;
