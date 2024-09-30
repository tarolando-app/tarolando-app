import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@rneui/base';

export default function App() {
  const { isAuthenticated, isGuest, logout } = useAuth();
  
  return (
    <View style={styles.container}>
      <Text>É usuario logado? {isAuthenticated? 'Sim':'Não'}</Text>
      <Button onPress={logout}>Sair</Button>
      <Text>Página de Profile!</Text>
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
