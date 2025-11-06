import { StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cardBackground,
  },
  scrollContainer: {
    padding: 20,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  itemBox: {
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 20,
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  itemText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  button: {
    flex: 1, 
  },
  removerButton: {
    flex: 1,
    backgroundColor: '#333333', 
  },
});