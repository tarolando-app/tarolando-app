import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function ButtonMenu({ size, color, active }: any) {
  return (
    <LinearGradient
      colors={["#AE03FF", "#5756FF", "#00A8FF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[
        active && { borderWidth: 1, borderColor: "#FFF" },
        styles.container,
      ]}
    >
      <MaterialCommunityIcons
        name="map-marker-outline"
        size={size}
        color={"#FFF"}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 64,
    height: 64,
    borderRadius: 100,
    backgroundColor:
      " linear-gradient(90deg, #AE03FF 0%, #5756FF 49%, #00A8FF 100%)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
