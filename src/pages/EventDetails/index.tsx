import React, { useEffect, useState } from "react";
import { View } from "react-native";
import TextGeneric from "../../components/TextGeneric";
import Container from "../../components/Container";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CustomTabNavigator from "../../components/CustomTabNavigator";
import AboutEvent from "./components/AboutEvent";
import { useRoute } from "@react-navigation/native";
import { fetchEventById } from "../../services/eventService";
import { useLocation } from "../../contexts/LocationContext";

export default function EventDetails() {
  const { location } = useLocation();
  const route: any = useRoute();
  const { params } = route;

  const [event, setEvent] = useState();

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

  const getEvent = async (id: string) => {
    const response = await fetchEventById(id, location);

    setEvent(response.data);
    console.log(response.data)
  };

  useEffect(() => {
    const id = params?.id;

    if (id) {
      getEvent(id);
    }
  }, []);

  const Tab = createMaterialTopTabNavigator();

  return (
    <Container>
      <CustomTabNavigator backRoute="Home">
        <Tab.Screen name="Sobre">
          {(props) => <AboutEvent {...props} event={event} />}
        </Tab.Screen>
        <Tab.Screen name="Pessoas" component={People} />
        <Tab.Screen name="Chat" component={Chat} />
      </CustomTabNavigator>
    </Container>
  );
}
