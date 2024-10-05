import React, { useState, memo } from "react";
import { View, ScrollView, RefreshControl, Text } from "react-native";
import HappeningNow from "../../../components/HappeningNow";
import UpcomingEvents from "../../../components/UpcomingEvents";
import { useEvents } from "../../../hooks/useEvents";
import { Skeleton } from "@rneui/themed";
import SkeletonLoadingHome from "../../../components/skeletons/SkeletonLoadingHome";
import TrendingEvents from "../../../components/TrendingEvents";

function Events({ tab, events }: any) {
  const [refreshing, setRefreshing] = useState(false);
  const {
    eventsHappeningNow,
    eventsUpcoming,
    eventsTrending,
    loading,
    error,
    loadEvents,
  } = events;

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
          colors={["#333"]}
          tintColor="#fff"
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      {eventsTrending && <TrendingEvents tab={tab} events={eventsTrending} />}
      <HappeningNow tab={tab} events={eventsHappeningNow} />
      <UpcomingEvents tab={tab} events={eventsUpcoming} />
    </ScrollView>
  );
}

export default memo(Events);
