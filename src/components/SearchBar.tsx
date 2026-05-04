import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Colors from '../constants/colors';

interface Props extends TextInputProps {
  containerStyle?: ViewStyle;
}

const SearchBar: React.FC<Props> = ({ containerStyle, style, ...props }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Feather name="search" size={20} color={Colors.textSecondary} style={styles.icon} />
      <TextInput
        style={[styles.input, style]}
        placeholder="O que deseja buscar?"
        placeholderTextColor={Colors.textSecondary}
        textAlignVertical="center"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
    height: 50,
    paddingHorizontal: 15,
    marginVertical: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
  },
});

export default SearchBar;