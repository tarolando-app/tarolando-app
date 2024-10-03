import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import CheckIn from "./pages/CheckIn";
import Map from "./pages/Map";
import Profile from "./pages/Profile";
import { Image, Vibration, View } from "react-native";
import * as Haptic from "expo-haptics";
import ButtonMenu from "./components/ButtonMenu";
import EventDetails from "./pages/EventDetails";
import EventsRoutes from "./pages/Events";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export function Routes() {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", () => {
      Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Light);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#171719",
          borderTopColor: "transparent",
          height: 72,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: "#00A8FF",
        tabBarInactiveTintColor: "#828385",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 500,
          fontFamily: "PlusJakartaSans-500",
        },
      }}
    >
      <Tab.Screen
        name="Início"
        component={EventsRoutes}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="home-outline"
              size={28}
              color={color}
            />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Evento"
        component={CreateEvent}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="plus" size={28} color={color} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="CheckIn"
        component={CheckIn}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ size, color, focused }) => (
            <ButtonMenu size={32} color={color} active={focused} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Mapa"
        component={Map}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="compass-outline"
              size={28}
              color={color}
            />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Image
              style={{ width: 30, height: 30, borderRadius: 100 }}
              source={{
                uri: "https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm90byUyMGRvJTIwcGVyZmlsfGVufDB8fDB8fHww",
              }}
            ></Image>
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}

export function ExtraRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="EventDetails" component={EventDetails} />
    </Stack.Navigator>
  );
}
