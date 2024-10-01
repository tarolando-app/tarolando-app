import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Routes, ExtraRoutes } from "./src/routes";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text } from "react-native";
import { LocationProvider } from "./src/contexts/LocationContext";
import EventDetails from "./src/pages/EventDetails";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";
import LoginScreen from "./src/auth/Login";
import WelcomeScreen from "./src/auth/Welcome";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import { darkColors } from "@rneui/base";

SplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated, isGuest } = useAuth();

  return (
    <SafeAreaView style={{ height: "100%", backgroundColor: "#171719" }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Main" component={Routes} />
            <Stack.Screen name="Chat" component={EventDetails} />
          </>
        ) : (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        )}
      </Stack.Navigator>
    </SafeAreaView>
  );
};
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

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      white: "#FFF",
      primary: "#00A8FF",
      background: "#333333",
      outline: "#333333",
      onSurface: "#FFF",
      onSurfaceVariant: "#FCFCFC",
    },
  };

  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <NavigationContainer>
          <LocationProvider>
            <StatusBar style="light" />
            <AppNavigator />
          </LocationProvider>
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}
