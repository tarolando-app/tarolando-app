import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function SimpleCardEvent() {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        source={{
          uri: 'https://diariodocomercio.com.br/wp-content/uploads/2023/01/festa-pic.jpg"',
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <View>
        <Text style={styles.text}>Pool Party</Text>
        <Text style={styles.textEventName}>
          Bar do Carinha {"  "}
          <Text style={styles.textDistance}>1 km</Text>
        </Text>
        <Text style={styles.textInfo}>Quinta-feira, 15 ago - 15h</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 110,
    borderRadius: 20,
    backgroundColor: "#252527",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    gap: 12
  },
  image: {
    height: "100%",
    width: 120,
    borderRadius: 10,
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
