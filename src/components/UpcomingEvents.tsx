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

export default function UpcomingEvents({ tab, events = [] }: any) {
  return (
    <View style={{ marginTop: 48, paddingBottom: 48 }}>
      <View style={styles.header}>
        <Text style={styles.text}>Próximos eventos</Text>
        <TouchableOpacity>
          <Text style={styles.textSeeMore}>Ver mais</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View
          style={{ flexDirection: "column", gap: 24, marginHorizontal: 16 }}
        >
          {events.map((event: any) => (
            <SimpleCardEvent key={event.eventId} event={event}></SimpleCardEvent>
          ))}
        </View>
      </View>
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
