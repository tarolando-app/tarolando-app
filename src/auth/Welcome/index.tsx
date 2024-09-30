import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Logo from "../../../assets/Logo.svg";
import { useAuth } from "../../contexts/AuthContext";
import ButtonGeneric from "../../components/ButtonGeneric";
import { TouchableOpacity } from "react-native-gesture-handler";
import TextGeneric from "../../components/TextGeneric";
import GradientImage from "../../components/GradientImage";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const { enterAsGuest } = useAuth();

  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <View>
        <GradientImage
          width={"100%"}
          height={"70%"}
          src={require("../../../assets/Image.png")}
          customShadow={1.1}
        />
      </View>
      <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <View style={styles.logo}>
          <Logo width={220} />
        </View>
        <View style={styles.buttons}>
          <ButtonGeneric
            onPress={() => navigation.navigate("Login")}
            weight={600}
            size={20}
            full
            text="Entrar"
          ></ButtonGeneric>
          <ButtonGeneric
            onPress={() => navigation.navigate("Register")}
            style={{ marginTop: 14 }}
            full
            size={20}
            outline
            weight={600}
            text="Registrar"
          ></ButtonGeneric>
          <TouchableOpacity
            onPress={enterAsGuest}
            style={{ marginHorizontal: "auto", marginTop: 60 }}
          >
            <TextGeneric style={{ textDecorationLine: "underline" }}>
              Entrar como convidado
            </TextGeneric>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#171719",
  },
  logo: {
    marginBottom: 80,
    marginHorizontal: "auto",
  },
  image: {
    maxHeight: "70%",
    width: "100%",
  },
  buttons: {
    paddingHorizontal: 24,
    marginBottom: 60,
  },
  text: {
    color: "#FFF",
    fontFamily: "PlusJakartaSans-700",
  },
});

export default WelcomeScreen;
