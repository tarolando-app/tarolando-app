import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    "PlusJakartaSans-200": require("./assets/fonts/PlusJakartaSans/PlusJakartaSans-ExtraLight.ttf"),
    "PlusJakartaSans-300": require("./assets/fonts/PlusJakartaSans/PlusJakartaSans-Light.ttf"),
    "PlusJakartaSans-400": require("./assets/fonts/PlusJakartaSans/PlusJakartaSans-Regular.ttf"),
    "PlusJakartaSans-500": require("./assets/fonts/PlusJakartaSans/PlusJakartaSans-Medium.ttf"),
    "PlusJakartaSans-600": require("./assets/fonts/PlusJakartaSans/PlusJakartaSans-SemiBold.ttf"),
    "PlusJakartaSans-700": require("./assets/fonts/PlusJakartaSans/PlusJakartaSans-Bold.ttf"),
    "PlusJakartaSans-800": require("./assets/fonts/PlusJakartaSans/PlusJakartaSans-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <SafeAreaView style={{ height: "100%", backgroundColor: "#171719" }}>
        <Routes></Routes>
      </SafeAreaView>
    </NavigationContainer>
  );
}
