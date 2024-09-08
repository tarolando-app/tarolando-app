import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CardEvent from "./CardEvent";

export default function HappeningNow() {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.text}>Rolando agora</Text>
        <TouchableOpacity>
          <Text style={styles.textSeeMore}>Ver mais</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 24,
          }}
        >
          <CardEvent></CardEvent>
          <CardEvent></CardEvent>
          <CardEvent></CardEvent>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  text: {
    color: "#FFF",
    fontSize: 18,
    marginBottom: 2,
    fontFamily: "PlusJakartaSans-600",
  },
  textSeeMore: {
    fontSize: 16,
    fontFamily: "PlusJakartaSans-600",
    color: "#99DCFF",
  },
});
