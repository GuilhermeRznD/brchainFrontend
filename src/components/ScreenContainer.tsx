// src/components/ScreenContainer.tsx
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
  children: React.ReactNode;
};

const ScreenContainer: React.FC<Props> = ({ children }) => {
  return (
    <LinearGradient
      colors={['#E8F5E9', '#A5D6A7']}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20, 
  },
});

export default ScreenContainer;