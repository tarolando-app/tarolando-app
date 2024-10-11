import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import CardEvent from "./CardEvent";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ButtonGeneric from "./ButtonGeneric";

const screenWidth = Dimensions.get("window").width;

export default function HappeningNow({ tab, events = [] }: any) {
  const navigation = useNavigation<any>();

  const navigateToList = () => {
    navigation.navigate("EventList", {
      happeningNow: true,
      recommended: tab === "Recomendados",
    });
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.text}>Rolando agora</Text>
        <TouchableOpacity onPress={navigateToList}>
          <Text style={styles.textSeeMore}>Ver mais</Text>
        </TouchableOpacity>
      </View>
      {events.length == 0 && (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            width: screenWidth,
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
            Não há eventos disponíveis agora.
          </Text>
          {tab === "Comunidade" && (
            <Text
              style={{
                fontFamily: "PlusJakartaSans-500",
                fontSize: 16,
                color: "#FFF",
                width: "80%",
                textAlign: "center",
                alignSelf: "center",
              }}
            >
              Está em algum evento? Informe a comunidade.
            </Text>
          )}

          <ButtonGeneric
            style={{ alignSelf: "center", marginTop: 20 }}
            onPress={() => navigation.navigate("Evento")}
            text="Criar Evento"
            icon="plus"
          ></ButtonGeneric>
        </View>
      )}

      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 24,
            marginHorizontal: 16,
          }}
        >
          {events.map((event: any) => (
            <CardEvent key={event.eventId} event={event}></CardEvent>
          ))}
        </View>
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
