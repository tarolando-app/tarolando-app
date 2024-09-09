import { useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function EventDetails() {
  const route = useRoute<any>();
  const { id } = route.params;
  
  return (
    <View style={styles.container}>
      <Text>Página de Detalhe do Evento! Evento id {id? id: ''}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
