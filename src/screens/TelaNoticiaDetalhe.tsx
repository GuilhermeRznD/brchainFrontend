// src/screens/TelaNoticiaDetalhe.tsx
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  StyleSheet,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/colors';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';

// ─── Configuração ─────────────────────────────────────────────────────────────

import { API_BASE, USER_ID } from '../config/api';

type DetalheScreenRouteProp = RouteProp<HomeStackParamList, 'Detalhe'>;
type DetalheScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Detalhe'>;

// ─── Componente ───────────────────────────────────────────────────────────────

const TelaNoticiaDetalhe: React.FC = () => {
  const navigation = useNavigation<DetalheScreenNavigationProp>();
  const route = useRoute<DetalheScreenRouteProp>();
  const { noticiaId, url } = route.params;

  const [isLoading, setIsLoading] = useState(true);
  const [modalVisivel, setModalVisivel] = useState(false);
  const webViewRef = useRef(null);

  // ── Feedback ──────────────────────────────────────────────────────────────
  const enviarFeedback = async (acao: 'gostei' | 'nao_gostei') => {
    try {
      await fetch(`${API_BASE}/feed/${USER_ID}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          article_id: noticiaId,
          action: acao,
        }),
      });
    } catch (error) {
      console.error('Erro ao enviar feedback:', error);
    } finally {
      setModalVisivel(false);
      navigation.goBack();
    }
  };

  const fecharSemFeedback = () => {
    setModalVisivel(false);
    navigation.goBack();
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.areaSegura}>

      {/* Barra superior */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setModalVisivel(true)}
          style={styles.botaoVoltar}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitulo} numberOfLines={1}>
          Lendo notícia
        </Text>
      </View>

      {/* WebView */}
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        style={styles.webview}
        // onLoadProgress é disparado continuamente durante o carregamento
        // e é mais confiável que onLoadEnd em certas páginas
        onLoadProgress={({ nativeEvent }) => {
          if (nativeEvent.progress === 1) {
            setIsLoading(false);
          }
        }}
        onLoadEnd={() => setIsLoading(false)}   // fallback adicional
        onError={() => setIsLoading(false)}      // garante que some em caso de erro
        renderLoading={() => (
          // renderLoading é o indicador nativo do WebView — mais confiável
          // que um overlay manual porque é controlado pelo próprio componente
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loadingTexto}>Carregando matéria...</Text>
          </View>
        )}
        startInLoadingState={true}  // ativa o renderLoading acima
      />

      {/* Modal de feedback */}
      <Modal
        visible={modalVisivel}
        transparent
        animationType="slide"
        onRequestClose={fecharSemFeedback}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>

            <Text style={styles.modalTitulo}>O que achou desta notícia?</Text>
            <Text style={styles.modalSubtitulo}>
              Seu feedback nos ajuda a recomendar conteúdos melhores para você.
            </Text>

            <TouchableOpacity
              style={[styles.botaoFeedback, styles.botaoGostei]}
              onPress={() => enviarFeedback('gostei')}
            >
              <MaterialCommunityIcons name="thumb-up-outline" size={20} color="#fff" />
              <Text style={styles.botaoFeedbackTexto}>Gostei</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.botaoFeedback, styles.botaoNaoGostei]}
              onPress={() => enviarFeedback('nao_gostei')}
            >
              <MaterialCommunityIcons name="thumb-down-outline" size={20} color="#fff" />
              <Text style={styles.botaoFeedbackTexto}>Não gostei</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={fecharSemFeedback} style={styles.botaoPular}>
              <Text style={styles.botaoPularTexto}>Pular</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

// ─── Estilos ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  areaSegura: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#fff',
  },
  botaoVoltar: {
    padding: 4,
    marginRight: 12,
  },
  headerTitulo: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingTexto: {
    marginTop: 12,
    fontSize: 14,
    color: Colors.textSecondary,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 28,
    paddingBottom: 40,
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitulo: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  botaoFeedback: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  botaoGostei: {
    backgroundColor: '#004D40',
  },
  botaoNaoGostei: {
    backgroundColor: '#B71C1C',
  },
  botaoFeedbackTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  botaoPular: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  botaoPularTexto: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});

export default TelaNoticiaDetalhe;
