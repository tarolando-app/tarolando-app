import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function SimpleCardEvent({ event }: any) {
  var moment = require("moment/min/moment-with-locales");
  moment.locale("pt-br");

  const formattedDate = moment(event.dateAndTime).format("dddd, D MMM • HH[h]");

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <TouchableOpacity style={styles.container}>
      <Image
        source={{
          uri: event?.urlCoverPhoto,
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <View>
        <Text style={styles.text}>{event.name}</Text>
        <Text style={styles.textEventName}>
        {event.googlePlace.name} {"  "}
          <Text style={styles.textDistance}>{event.distanceInKm} km</Text>
        </Text>
        <Text style={styles.textInfo}>{capitalizeFirstLetter(formattedDate)}</Text>
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
