import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import ButtonGeneric from "../../components/ButtonGeneric";
import TextGeneric from "../../components/TextGeneric";

const LoginScreen = () => {
  const { login, enterAsGuest } = useAuth();

  const handleLogin = () => {
    const userData = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
    };
    login(userData);
  };

  return (
    <View style={styles.container}>
      <ButtonGeneric outline size={20} icon="arrow-left"></ButtonGeneric>
      <View style={{ marginVertical: 12 }}>
        <TextGeneric size={28}>Bem vindo de volta!</TextGeneric>
        <TextGeneric size={28}>Que bom ver você.</TextGeneric>
      </View>
      <View>
        
      </View>
      <ButtonGeneric
        style={{ marginTop: 32 }}
        full
        text="Entrar"
      ></ButtonGeneric>

      <View style={styles.divisorWrapper}>
        <View style={styles.divisor}></View>
        <TextGeneric weight={300}>Ou</TextGeneric>
        <View style={styles.divisor}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171719",
    padding: 24,
  },
  divisorWrapper: {
    display: "flex",
    marginTop: 10,
    gap: 12,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  divisor: {
    backgroundColor: "#FFF",
    flex: 1,
    height: 1,
  },
});

export default LoginScreen;
