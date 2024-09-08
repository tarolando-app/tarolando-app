import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import GradientImage from "./GradientImage";
import GradientView from "./GradientView";

export default function CardEvent() {
  return (
    <TouchableOpacity style={styles.container}>
      <GradientImage
        height={120}
        width={"100%"}
        url="https://diariodocomercio.com.br/wp-content/uploads/2023/01/festa-pic.jpg"
      ></GradientImage>
      <GradientView height={110} width={"100%"}>
        <View
          style={{
            zIndex: 2,
            padding: 16,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.text}>Pool Party</Text>
            <Image
              style={{
                height: 22,
              }}
              source={require("../../assets/3d-fire.png")}
              resizeMode="cover"
            />
          </View>
          <View>
            <Text style={styles.textEventName}>
              Bar do Carinha {"  "}<Text style={styles.textDistance}>1 km</Text>
            </Text>
            <Text style={styles.textInfo}>Quinta-feira, 15 ago - 15h</Text>
          </View>
        </View>
      </GradientView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 240,
    height: 230,
    borderRadius: 20,
    backgroundColor: "#252527",
  },
  items: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  textLocalization: {
    color: "#FFF",
    opacity: 0.5,
    fontSize: 14,
    marginBottom: 2,
    fontFamily: "PlusJakartaSans-400",
  },
  text: {
    color: "#FFF",
    fontSize: 18,
    fontFamily: "PlusJakartaSans-700",
  },
  textEventName: {
    marginTop: 6,
    color: "#FFF",
    fontSize: 14,
    fontFamily: "PlusJakartaSans-500",
  },
  textDistance: {
    color: "#00A8FF",
    fontSize: 14,
    fontFamily: "PlusJakartaSans-700",
  },
  textInfo: {
    marginTop: 6,
    color: "#00A8FF",
    fontSize: 14,
    fontFamily: "PlusJakartaSans-500",
  },
});
