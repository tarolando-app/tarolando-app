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
import { useNavigation } from "@react-navigation/native";

export default function UpcomingEvents({ tab, events = [] }: any) {
  const navigation = useNavigation<any>();

  const navigateToList = () => {
    navigation.navigate("EventList", {
      happeningNow: false,
      recommended: tab === "Recomendados",
    });
  };

  return (
    <View style={{ marginTop: 48, paddingBottom: 48 }}>
      <View style={styles.header}>
        <Text style={styles.text}>Próximos eventos</Text>
        <TouchableOpacity onPress={navigateToList}>
          <Text style={styles.textSeeMore}>Ver mais</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View
          style={{ flexDirection: "column", gap: 24, marginHorizontal: 16 }}
        >
          {events.length == 0 && (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                marginVertical: 20,
              }}
            >
              <Text
                style={{
                  fontFamily: "PlusJakartaSans-500",
                  fontSize: 20,
                  color: "#FFF",
                  width: "80%",
                  textAlign: "center",
                  alignSelf: "center",
                  marginBottom: 10,
                }}
              >
                Não há eventos disponíveis.
              </Text>
            </View>
          )}
          {events.map((event: any) => (
            <SimpleCardEvent
              key={event.eventId}
              event={event}
            ></SimpleCardEvent>
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
