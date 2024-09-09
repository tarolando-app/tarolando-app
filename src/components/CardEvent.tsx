import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import GradientImage from "./GradientImage";
import GradientView from "./GradientView";
import { useNavigation } from "@react-navigation/native";

export default function CardEvent({ event }: any) {
  const navigation = useNavigation<any>();

  const handlePress = (id: string) => {
    navigation.navigate("EventDetails", { id });
  };

  var moment = require("moment/min/moment-with-locales");
  moment.locale("pt-br");

  const formattedDate = moment(event.dateAndTime).format("dddd, D MMM • HH[h]");

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <TouchableOpacity
      onPress={() => {
        handlePress(event.eventId);
      }}
      style={styles.container}
    >
      <GradientImage
        height={120}
        width={"100%"}
        url={event.urlCoverPhoto}
        styleImage={{ borderTopRightRadius: 20, borderTopLeftRadius: 20 }}
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
            <Text style={styles.text}>{truncateText(event.name, 18)}</Text>
            <MaterialCommunityIcons name="fire" size={26} color={"#f2721c"} />
          </View>
          <View>
            <Text style={styles.textEventName}>
              {truncateText(event.googlePlace.name, 21)} {"  "}
              <Text style={styles.textDistance}>{event.distanceInKm} km</Text>
            </Text>
            <Text style={styles.textInfo}>
              {capitalizeFirstLetter(formattedDate)}
            </Text>
          </View>
        </View>
      </GradientView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 260,
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
