import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import moment from "moment";
import { useLocation } from "../contexts/LocationContext";
import {
  fetchHappeningNow,
  fetchUpcoming,
  fetchTrending,
} from "../services/eventService";

export function useEvents(tab: string, index: number) {
  const conditions = [
    { tab: "Recomendados", index: 1 },
    { tab: "Comunidade", index: 0 },
  ];

  const shouldLoadEvents = conditions.some(
    (cond) => cond.tab === tab && cond.index === index
  );

  const [eventsHappeningNow, setEventsHappeningNow] = useState<Event[]>([]);
  const [eventsUpcoming, setEventsUpcoming] = useState<Event[]>([]);
  const [eventsTrending, setEventsTrending] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { location } = useLocation();

  const loadEvents = useCallback(async () => {
    if (!location || !shouldLoadEvents) return;

    try {
      setLoading(true);

      const startDate = moment().format("YYYY-MM-DDTHH:mm:ss");
      const endDate = moment().add(3, "months").format("YYYY-MM-DDTHH:mm:ss");

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

      const trendingPromise = fetchTrending({
        latitude: location?.latitude,
        longitude: location?.longitude,
        recommended: tab === "Recomendados",
      });

      const [happeningNowResponse, upcomingResponse, trendingResponse] =
        await Promise.all([
          happeningNowPromise,
          upcomingPromise,
          trendingPromise,
        ]);
        
      setEventsHappeningNow(happeningNowResponse.data.items);
      setEventsUpcoming(upcomingResponse.data.items);
      setEventsTrending(trendingResponse?.data);
      setError(null);
    } catch (error) {
      setError("Ocorreu um erro ao buscar os eventos.");
      Alert.alert("Ocorreu um erro ao buscar os eventos.");
    } finally {
      setLoading(false);
    }
    console.log('chamou aqui')
  }, [location, tab]);

  useEffect(() => {
    if (location) {
      loadEvents();
    }
  }, [location, loadEvents]);

  return { eventsHappeningNow, eventsUpcoming, eventsTrending, loading, error, loadEvents };
}
