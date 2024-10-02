import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "@rneui/base";
import { useEffect } from "react";
import { fetchEventType } from "../../services/eventService";
import Container from "../../components/Container";
import Header from "../../components/Header";
import TextGeneric from "../../components/TextGeneric";
import ButtonGeneric from "../../components/ButtonGeneric";

export default function App() {
  const { isAuthenticated, isGuest, logout, user } = useAuth();

  const getEventsType = async () => {
    const result = await fetchEventType();

    console.log(result.data);
  };

  useEffect(() => {}, []);

  return (
    <Container>
      <Header text="Perfil"></Header>
      <View style={styles.container}>
        <TextGeneric>{user?.email}</TextGeneric>
        <TextGeneric>É usuario logado? {isAuthenticated && !isGuest ? "Sim" : "Não"}</TextGeneric>

        <ButtonGeneric style={{marginTop: 24}} text="Sair" full onPress={logout}></ButtonGeneric>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
