import React from "react";
import { View } from "react-native";
import TextGeneric from "../../components/TextGeneric";
import Container from "../../components/Container";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CustomTabNavigator from "../../components/CustomTabNavigator";


export default function EventDetails() {
  const Event = () => {
    return (
      <View>
        <TextGeneric>Evento</TextGeneric>
      </View>
    );
  };

  const People = () => {
    return (
      <View>
        <TextGeneric>Pessoas</TextGeneric>
      </View>
    );
  };

  const Chat = () => {
    return (
      <View>
        <TextGeneric>Chat</TextGeneric>
      </View>
    );
  };

  const Tab = createMaterialTopTabNavigator();

  return (
    <Container>
      <CustomTabNavigator backRoute="Home">
        <Tab.Screen name="Sobre" component={Event} />
        <Tab.Screen name="Pessoas" component={People} />
        <Tab.Screen name="Chat" component={Chat} />
      </CustomTabNavigator>
    </Container>
  );
}
