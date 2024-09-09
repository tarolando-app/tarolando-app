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

const screenWidth = Dimensions.get("window").width;

export default function HappeningNow({ tab, events = [] }: any) {
  const navigation = useNavigation<any>();

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.text}>Rolando agora</Text>
        <TouchableOpacity>
          <Text style={styles.textSeeMore}>Ver mais</Text>
        </TouchableOpacity>
      </View>
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

              <TouchableOpacity
                onPress={() => navigation.navigate("Evento")}
                style={{ alignSelf: "center", marginTop: 20 }}
              >
                <LinearGradient
                  colors={["#AE03FF", "#5756FF", "#00A8FF"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 5,
                    width: 150,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "PlusJakartaSans-700",
                      fontSize: 16,
                      color: "#FFF",
                      width: 100,
                      textAlign: "center",
                      alignSelf: "center",
                      marginVertical: 20,
                    }}
                  >
                    Criar evento
                  </Text>
                  <MaterialCommunityIcons
                    name="plus"
                    size={32}
                    color={"#FFF"}
                  />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
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
