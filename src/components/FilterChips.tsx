import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

type Props = {
  filtroAtivo: string;
  setFiltroAtivo: (filtro: string) => void;
  filtros: string[];
};

const FilterChips: React.FC<Props> = ({
  filtroAtivo,
  setFiltroAtivo,
  filtros,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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

const getCategoryColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'artigo':
      return '#90D788';
    case 'dicas de saúde':
      return '#FFC042';
    case 'notícia':
      return '#50D8E8';
    default:
      return Colors.primary;
  }
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    marginVertical: 15,
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