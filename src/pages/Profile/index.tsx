import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "@rneui/base";
import { useEffect } from "react";
import { fetchEventType } from "../../services/eventService";

export default function App() {
  const { isAuthenticated, isGuest, logout, user } = useAuth();

  const getEventsType = async () => {
    const result = await fetchEventType();

    console.log(result.data);
  };

  useEffect(() => {
 
  }, []);

  return (
    <View style={styles.container}>
      <Text>{user?.email}</Text>
      <Text>É usuario logado? {isAuthenticated ? "Sim" : "Não"}</Text>
      <Button onPress={logout}>Sair</Button>
      <Text>Página de Profile!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
