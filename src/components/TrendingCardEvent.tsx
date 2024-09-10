import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import GradientImage from "./GradientImage";

export default function SimpleCardEvent({ event }: any) {
  var moment = require("moment/min/moment-with-locales");
  moment.locale("pt-br");

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <TouchableOpacity style={styles.container}>
      <GradientImage
        height={120}
        width={200}
        url={event.urlCoverPhoto}
        styleImage={{ borderRadius: 20 }}
        customShadow={1.8}
      >
        <View style={styles.position}>
          <Text style={styles.textEventName}>{truncateText(event.googlePlace.name, 21)}</Text>
        </View>
      </GradientImage>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    borderRadius: 20,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
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
  position: {
    position: "absolute",
    bottom: 16,
    left: 16,
  },
  textEventName: {
    marginTop: 6,
    color: "#FFF",
    fontSize: 14,
    fontFamily: "PlusJakartaSans-600",

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
