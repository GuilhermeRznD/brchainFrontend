// src/components/FilterChips.tsx
import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

type Props = {
  filtroAtivo: string;
  setFiltroAtivo: (filtro: string) => void;
  filtros: string[];
};

// Paleta de cores para os tópicos do Tags.json
// Cada categoria tem uma cor única para facilitar a identificação visual
const CORES_CATEGORIAS: Record<string, string> = {
  'Nutrição':     '#FFC042',
  'Treino':       '#90D788',
  'Sono':         '#9B8FE8',
  'Saúde Mental': '#F28B82',
  'Doenças':      '#50D8E8',
  'Prevenção':    '#81C995',
  'Medicina':     '#78B9E8',
  'Pesquisa':     '#E8A870',
};

const getCategoryColor = (tipo: string): string => {
  return CORES_CATEGORIAS[tipo] ?? Colors.primary;
};

const FilterChips: React.FC<Props> = ({ filtroAtivo, setFiltroAtivo, filtros }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filtros.map((filtro) => {
          const isAtivo = filtroAtivo === filtro;
          const cor = getCategoryColor(filtro);

          return (
            <TouchableOpacity
              key={filtro}
              style={[
                styles.chip,
                isAtivo
                  ? { backgroundColor: cor, borderColor: cor }
                  : styles.chipInativo,
              ]}
              onPress={() => setFiltroAtivo(isAtivo ? '' : filtro)}
            >
              <Text style={isAtivo ? styles.textoAtivo : styles.textoInativo}>
                {filtro}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  chip: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    borderWidth: 1,
  },
  chipInativo: {
    backgroundColor: '#fff',
    borderColor: '#E0E0E0',
  },
  textoAtivo: {
    color: '#fff',
    fontWeight: 'bold',
  },
  textoInativo: {
    color: Colors.textSecondary,
    fontWeight: '500',
  },
});

export default FilterChips;
