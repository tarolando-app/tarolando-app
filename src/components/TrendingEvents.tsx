import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import CardEvent from "./CardEvent";
import SimpleCardEvent from "./SimpleCardEvent";
import TrendingCardEvent from "./TrendingCardEvent";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TrendingEvents({ tab, events = [] }: any) {
  return (
    <View style={{ marginTop: 0, paddingBottom: 48 }}>
      <View style={styles.header}>
        <Text style={styles.text}>Em Alta <MaterialCommunityIcons name="fire" size={26} color={"#f2721c"} /></Text>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
        {events.map((event: any) => (
          <TrendingCardEvent
            key={event.eventId}
            event={event}
          ></TrendingCardEvent>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    marginHorizontal: 16,
  },
  text: {
    color: "#FFF",
    fontSize: 20,
  },
  textSeeMore: {
    fontSize: 18,
    color: "#99DCFF",
  },
});
