import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Container from '../../components/Container';
import Header from '../../components/Header';

export default function App() {
  return (
    <Container>
    <Header text="Check-in"></Header>
  </Container>
  );
}

const styles = StyleSheet.create({});
