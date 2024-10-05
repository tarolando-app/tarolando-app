import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Text,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import HappeningNow from "../../components/HappeningNow";
import Tabs from "../../components/Tabs"; // Seu componente de abas
import GradientImage from "../../components/GradientImage";
import LocalizationInput from "../../components/LocalizationInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Events from "./components/Events";
import CustomTabNavigator from "../../components/CustomTabNavigator";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useEvents } from "../../hooks/useEvents";

export default function Home() {
  const eventsCommunity = useEvents("Comunidade");
  const eventsRecommended = useEvents("Recomendados");

  const Community = () => {
    return <Events tab="Comunidade" events={eventsCommunity} />;
  };

  const Recommended = () => {
    return <Events tab="Recomendados" events={eventsRecommended} />;
  };

  const statusBarHeight = StatusBar.currentHeight || 0;

  const Tab = createMaterialTopTabNavigator();

  return (
    <SafeAreaView style={{ paddingTop: statusBarHeight, ...styles.container }}>
      <View style={styles.imageBackground}>
        <GradientImage
          width={"120%"}
          height={300}
          src={require("../../../assets/background-home.png")}
        />
      </View>
      <View style={styles.headerWrapper}>
        <LocalizationInput />

        <TouchableOpacity
          onPress={() => {
            console.log("apertou");
          }}
        >
          <MaterialCommunityIcons
            name="bell-outline"
            size={28}
            color={"#FFF"}
          />
        </TouchableOpacity>
      </View>

      <CustomTabNavigator style={{ marginTop: 32, marginBottom: 48 }}>
        <Tab.Screen name="Comunidade" component={Community} />
        <Tab.Screen name="Recomendados" component={Recommended} />
      </CustomTabNavigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171719",
    color: "#FFF",
    position: "relative",
  },
  headerWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 16,
    marginHorizontal: 16,
  },
  imageBackground: {
    position: "absolute",
    height: 300,
    width: "100%",
    top: 0,
  },
});
