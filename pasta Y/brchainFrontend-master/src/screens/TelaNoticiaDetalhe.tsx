import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';
import { styles } from './styles/telaNoticiaDetalheStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_URL } from '../constants/api';

type DetalheScreenRouteProp = RouteProp<HomeStackParamList, 'Detalhe'>;
type DetalheScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Detalhe'>;

const TelaNoticiaDetalhe: React.FC = () => {
  const navigation = useNavigation<DetalheScreenNavigationProp>();
  const route = useRoute<DetalheScreenRouteProp>();
  const { noticiaId } = route.params;

  const [titulo, setTitulo] = useState<string>('Carregando...');
  const [sourceUrl, setSourceUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoadingMeta, setIsLoadingMeta] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_URL}/articles/${noticiaId}`, { headers: { Accept: 'application/json' } })
      .then((r) => {
        if (!r.ok) throw new Error(`Notícia não encontrada (HTTP ${r.status}).`);
        return r.json();
      })
      .then((data) => {
        if (cancelled) return;
        setTitulo(data.title || 'Sem título');
        setSourceUrl(data.url || null);
      })
      .catch((err) => {
        if (cancelled) return;
        setErrorMsg(err instanceof Error ? err.message : 'Erro ao buscar notícia.');
      })
      .finally(() => {
        if (!cancelled) setIsLoadingMeta(false);
      });
    return () => {
      cancelled = true;
    };
  }, [noticiaId]);

  return (
    <SafeAreaView style={styles.areaSegura} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {titulo}
        </Text>
      </View>

      {isLoadingMeta && (
        <View style={{ padding: 20, alignItems: 'center' }}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )}

      {!isLoadingMeta && errorMsg && (
        <View style={{ padding: 20 }}>
          <Text style={{ color: '#B71C1C', fontWeight: 'bold', marginBottom: 8 }}>
            {errorMsg}
          </Text>
        </View>
      )}

      {!isLoadingMeta && !errorMsg && sourceUrl && (
        <WebView
          source={{ uri: sourceUrl }}
          startInLoadingState
          renderLoading={() => (
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
              }}
            >
              <ActivityIndicator size="large" color={Colors.primary} />
              <Text style={{ marginTop: 10, color: Colors.textSecondary }}>
                Carregando matéria...
              </Text>
            </View>
          )}
          allowsBackForwardNavigationGestures
          decelerationRate="normal"
        />
      )}

      {!isLoadingMeta && !errorMsg && !sourceUrl && (
        <View style={{ padding: 20 }}>
          <Text style={{ color: Colors.textSecondary }}>
            Esta notícia não tem URL original disponível para leitura.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default TelaNoticiaDetalhe;
