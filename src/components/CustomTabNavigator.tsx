import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useWindowDimensions, View } from "react-native";
import TextGeneric from "./TextGeneric";
import ButtonGeneric from "./ButtonGeneric";
import { useNavigation } from "@react-navigation/native";
import { ZoomIn } from "react-native-reanimated";

const Tab = createMaterialTopTabNavigator();

const CustomTabNavigator = ({
  children,
  style,
  backRoute,
}: {
  children: React.ReactNode;
  style?: any;
  backRoute?: any;
}) => {
  const { width } = useWindowDimensions();
  const numOfScreens = React.Children.count(children);
  const navigation = useNavigation<any>();

  const haveButton = {
    width: "76%",
    justifyContent: "center",
    marginHorizontal: "auto",
  };

  if (backRoute) {
    style = { ...style, ...haveButton };
  }

  return (
    <View style={{ flex: 1 }}>
      {backRoute && (
        <ButtonGeneric
          onPress={() => navigation.navigate(backRoute)}
          onlyIcon
          icon="arrow-left"
          size={24}
          style={{ position: "absolute", left: -10, zIndex: 5 }}
        ></ButtonGeneric>
      )}

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
                numberOfLines={1}
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
            marginLeft: (width / numOfScreens - (backRoute ? 90 : 60)) / 2, // Calcula o marginLeft dinamicamente
          },
          tabBarActiveTintColor: "#99DCFF",
          tabBarInactiveTintColor: "#FFF",
        })}
      >
        {children}
      </Tab.Navigator>
    </View>
  );
};

export default CustomTabNavigator;
