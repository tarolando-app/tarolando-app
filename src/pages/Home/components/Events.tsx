import React, { useState, memo } from "react";
import { View, ScrollView, RefreshControl, Text } from "react-native";
import HappeningNow from "../../../components/HappeningNow";
import UpcomingEvents from "../../../components/UpcomingEvents";
import { useEvents } from "../../../hooks/useEvents";
import { Skeleton } from "@rneui/themed";
import SkeletonLoadingHome from "../../../components/skeletons/SkeletonLoadingHome";

function Events({ tab, index }: any) {
  const [refreshing, setRefreshing] = useState(false);
  const { eventsHappeningNow, eventsUpcoming, loading, error, loadEvents } =
    useEvents(tab, index);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadEvents();
    setRefreshing(false);
  };

  if (loading) {
    return <SkeletonLoadingHome />;
  }

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    ); // Mensagem de erro
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      horizontal={false}
      refreshControl={
        <RefreshControl
          colors={["#fff"]}
          tintColor="#fff"
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <HappeningNow tab={tab} events={eventsHappeningNow} />
      <UpcomingEvents tab={tab} events={eventsUpcoming} />
    </ScrollView>
  );
}

export default memo(Events);
