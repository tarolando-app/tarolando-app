import React from "react";

import HappeningNow from "../../../components/HappeningNow";
import { View } from "react-native";
import UpcomingEvents from "../../../components/UpcomingEvents";
import { ScrollView } from "react-native";

export default function Events({ tab }: any) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} horizontal={false}>
      <HappeningNow />
      <UpcomingEvents />
    </ScrollView>
  );
}
