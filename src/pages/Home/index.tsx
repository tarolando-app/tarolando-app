import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import HappeningNow from "../../components/HappeningNow";
import Tabs from "../../components/Tabs"; // Seu componente de abas
import GradientImage from "../../components/GradientImage";
import LocalizationInput from "../../components/LocalizationInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Events from "./components/Events";

const initialLayout = { width: Dimensions.get("window").width };

export default function App() {
  const [index, setIndex] = useState(0); // Gerencia o índice das abas
  const [routes] = useState([
    { key: "comunidade", title: "Comunidade" },
    { key: "recomendados", title: "Recomendados" },
  ]);

  // Mapeia as cenas para cada aba
  const renderScene = SceneMap({
    comunidade: () => <Events tab="Comunidade" />,
    recomendados: () => <Events tab="Recomendados" />,
  });

  // Atualiza o índice com base no swipe ou clique no seu componente Tabs
  const handleTabChange = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  const statusBarHeight = StatusBar.currentHeight || 0;

  return (
    <SafeAreaView style={{paddingTop: statusBarHeight, ...styles.container}}>
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

      <View style={{ marginTop: 52 }}>
      <Tabs
          tabs={[{ name: "Comunidade" }, { name: "Recomendados" }]}
          selectedIndex={index} // Passa o índice atual do TabView
          onTabChange={handleTabChange}
        />
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex} // Atualiza o índice ao fazer swipe
        initialLayout={initialLayout}
        renderTabBar={() => null} // Remove o cabeçalho/tab bar nativo
        swipeEnabled={true} // Habilita o swipe
        lazy={true}
        style={{ backgroundColor: "transparent", marginTop: 48 }} // Remove fundo do TabView
      />
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
