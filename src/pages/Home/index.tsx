import { StatusBar, TouchableOpacity } from "react-native";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import LocalizationInput from "../../components/LocalizationInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Tabs from "../../components/Tabs";
import HappeningNow from "../../components/HappeningNow";
import GradientImage from "../../components/GradientImage";

export default function App() {
  const tabs = [
    {
      name: "Comunidade",
      selected: false,
    },
    {
      name: "Recomendados",
      selected: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageBackground}>
        <GradientImage width={'120%'} height={300} url="https://i.ibb.co/xSxBP6X/background-home.png" />
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
        <Tabs tabs={tabs} />
      </View>

      <View style={{ marginTop: 52 }}>
        <HappeningNow />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171719",
    color: "#FFF",
    paddingTop: StatusBar.currentHeight,
    position: 'relative'
  },
  headerWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 16,
    marginHorizontal: 16
  },
  imageBackground: {
    position: 'absolute',
    height: 300,
    width: '100%',
    top: 0
  }
});
