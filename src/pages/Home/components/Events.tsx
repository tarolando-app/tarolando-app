import React, { useEffect, useState, useCallback } from "react";
import { Alert, View, ScrollView, RefreshControl } from "react-native";
import HappeningNow from "../../../components/HappeningNow";
import UpcomingEvents from "../../../components/UpcomingEvents";
import { fetchHappeningNow, fetchUpcoming } from "../../../services/eventService";
import { useLocation } from "../../../contexts/LocationContext";
import moment from "moment";

export default function Events({ tab }: any) {
  const [eventsHappeningNow, setEventsHappeningNow] = useState<Event[]>([]);
  const [eventsUpcoming, setEventsUpcoming] = useState<Event[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [locationAvailable, setLocationAvailable] = useState(false);
  const { location } = useLocation();

  // Função para carregar eventos quando a localização está disponível
  const loadEvents = useCallback(async () => {
    try {
      if (location) {
        setLocationAvailable(true);

        const startDate = moment().format('YYYY-MM-DDTHH:mm:ss');  // Formato ISO8601
        const endDate = moment().add(3, 'months').format('YYYY-MM-DDTHH:mm:ss');  // 3 meses adiante

        const happeningNowPromise = fetchHappeningNow({
          latitude: location?.latitude,
          longitude: location?.longitude,
          page: 1,
          pageSize: 10,
          maxDistanceInKm: 30,
          recommended: tab === "Recomendados",
        });

        const upcomingPromise = fetchUpcoming({
          latitude: location?.latitude,
          longitude: location?.longitude,
          page: 1,
          pageSize: 10,
          maxDistanceInKm: 30,
          recommended: tab === "Recomendados",
          startDate,
          endDate,
        });

        const [happeningNowResponse, upcomingResponse] = await Promise.all([happeningNowPromise, upcomingPromise]);

        setEventsHappeningNow(happeningNowResponse.data.items);
        setEventsUpcoming(upcomingResponse.data.items);
      }
    } catch (error) {
      Alert.alert("Ocorreu um erro ao buscar os eventos.");
    }
  }, [location, tab]);

  useEffect(() => {
    if (location) {
      loadEvents();
    } else {
      // Caso a localização não esteja disponível, configura um intervalo para verificar
      const intervalId = setInterval(() => {
        if (location) {
          clearInterval(intervalId);
          loadEvents();
        }
      }, 1000);

      // Limpa o intervalo caso o componente seja desmontado
      return () => clearInterval(intervalId);
    }
  }, [location, loadEvents]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await loadEvents();
    } catch (error) {
      Alert.alert("Ocorreu um erro ao atualizar os eventos.");
    }
    setRefreshing(false);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      horizontal={false}
      refreshControl={
        <RefreshControl colors={['#fff']} tintColor="#fff" refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <HappeningNow events={eventsHappeningNow} />
      <UpcomingEvents events={eventsUpcoming} />
    </ScrollView>
  );
}
