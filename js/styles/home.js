import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  picker: {
    flexGrow: 1,
  },
  pickerWithLabel: {
    flexDirection: 'row', 
    alignItems: 'center',
  }
});