import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Colors from '../constants/colors';

type Props = {
  filtroAtivo: string;
  setFiltroAtivo: (filtro: string) => void;
  filtros: string[];
  isOpen: boolean;
  onToggle: () => void;
};

const getCategoryColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'dicas de saúde':
      return '#FFC042';
    case 'notícia':
      return '#50D8E8';
    default:
      return Colors.primary;
  }
};

const FilterButton: React.FC<Props> = ({ filtroAtivo, setFiltroAtivo, filtros, isOpen, onToggle }) => {

  return (
    <View style={styles.row}>
      {isOpen && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsContainer}
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
                    : { backgroundColor: '#fff', borderColor: '#E0E0E0' },
                ]}
                onPress={() => setFiltroAtivo(isAtivo ? '' : filtro)}
              >
                <Text style={isAtivo ? styles.chipTextAtivo : styles.chipTextInativo}>
                  {filtro}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}

      <TouchableOpacity
        style={[styles.filterButton, isOpen && styles.filterButtonActive]}
        onPress={onToggle}
      >
        <Feather name="sliders" size={16} color={isOpen ? '#fff' : Colors.textSecondary} />
        <Text style={[styles.filterButtonText, isOpen && styles.filterButtonTextActive]}>
          Filtrar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  chipsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  chip: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 8,
    borderWidth: 1,
  },
  chipTextAtivo: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  chipTextInativo: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  filterButtonTextActive: {
    color: '#fff',
  },
});

export default FilterButton;
