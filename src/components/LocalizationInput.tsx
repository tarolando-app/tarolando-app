import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function LocalizationInput() {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.textLocalization}>
        Sua localização{"  "}
        <MaterialCommunityIcons
          name="arrow-down-drop-circle-outline"
          size={16}
          color={"#FFF"}
        />
      </Text>
      <Text style={styles.text}>Belo Horizonte, Brasil</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
  items: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  textLocalization: {
    color: "#FFF",
    opacity: 0.5,
    fontSize: 16,
    marginBottom: 2,
    fontFamily: "PlusJakartaSans-400",
  },
  text: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "PlusJakartaSans-500",
  },
});
