import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useWindowDimensions } from "react-native";
import TextGeneric from "./TextGeneric";

const Tab = createMaterialTopTabNavigator();

const CustomTabNavigator = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) => {
  const { width } = useWindowDimensions();
  const numOfScreens = React.Children.count(children);

  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: "transparent" }}
      screenOptions={({ route }) => ({
        unmountOnBlur: false,
        tabBarStyle: {
          ...style,
          backgroundColor: "transparent",
        },
        tabBarLabel: ({ focused }) => {
          return (
            <TextGeneric
              size={18}
              weight={600}
              color={focused ? "#99DCFF" : "#FFF"}
              style={{
                textTransform: "capitalize",
              }}
            >
              {route.name}
            </TextGeneric>
          );
        },
        tabBarIndicatorStyle: {
          backgroundColor: "#4DC2FF",
          height: 4,
          borderRadius: 10,
          width: 50, // Largura fixa do indicador
          marginLeft: (width / numOfScreens - 60) / 2, // Calcula o marginLeft dinamicamente
        },
        tabBarActiveTintColor: "#99DCFF",
        tabBarInactiveTintColor: "#FFF",
      })}
    >
      {children}
    </Tab.Navigator>
  );
};

export default CustomTabNavigator;
