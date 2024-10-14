import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from "react-native";
import Container from "../../components/Container";
import Header from "../../components/Header";
import { TextInput } from "react-native-paper";
import ButtonGeneric from "../../components/ButtonGeneric";
import { useEffect, useState, useCallback, useRef } from "react";
import { fetchHappeningNow, fetchUpcoming } from "../../services/eventService";
import { useLocation } from "../../contexts/LocationContext";
import moment from "moment";
import SimpleCardEvent from "../../components/SimpleCardEvent";
import { useNavigation, useRoute } from "@react-navigation/native";
import TextGeneric from "../../components/TextGeneric";
import { Skeleton } from "@rneui/themed";

export default function EventList() {
  const [recommended, setRecommended] = useState(true);
  const [happeningNow, setHappeningNow] = useState(true);
  const [events, setEvents] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Controla a página atual
  const [totalPages, setTotalPages] = useState(1); // Número total de páginas
  const [refreshing, setRefreshing] = useState(false); // Estado para pull-to-refresh
  const { location } = useLocation();
  const [filters, setFilters] = useState<any>({});
  const skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const route: any = useRoute();
  const { params } = route;

  const navigation = useNavigation<any>();

  const loadEventsHappeningNow = async (
    isRecommended?: boolean,
    pageNumber = 1,
    filter?: any
  ) => {
    if (pageNumber > totalPages) return; // Evita buscar se já estiver na última página
    setLoading(true);

    const happeningNowPromise = await fetchHappeningNow({
      latitude: location?.latitude,
      longitude: location?.longitude,
      page: pageNumber,
      pageSize: 10,
      maxDistanceInKm: filters.maxDistanceInKm || 30, // Aplica filtro de distância
      recommended: isRecommended,
      eventName: filter?.eventName, // Aplica filtro de nome do evento
      eventTypesIds: filter?.EventTypesIds, // Aplica filtro de tipo de evento
      musicalGenreIds: filter?.MuscalGenreIds, // Aplica filtro de gênero musical
      startDate: filter?.StartDate, // Aplica filtro de data inicial
      endDate: filter?.EndDate, // Aplica filtro de data final
    });

    setLoading(false);
    setTotalPages(happeningNowPromise.data.totalPages); // Define o total de páginas
    setEvents((prev: any) => [...prev, ...happeningNowPromise.data.items]); // Adiciona os eventos
  };

  // Método atualizado para incluir filtros
  const loadEventsUpcoming = async (
    isRecommended?: boolean,
    pageNumber = 1,
    filter?: any
  ) => {
    if (pageNumber > totalPages) return; // Evita buscar se já estiver na última página
    const startDate =
      filters.StartDate || moment().format("YYYY-MM-DDTHH:mm:ss");
    const endDate =
      filters.EndDate ||
      moment().add(3, "months").format("YYYY-MM-DDTHH:mm:ss");
    setLoading(true);

    const upcomingPromise = await fetchUpcoming({
      latitude: location?.latitude,
      longitude: location?.longitude,
      page: pageNumber,
      pageSize: 10,
      maxDistanceInKm: filter?.maxDistanceInKm || 30, // Aplica filtro de distância
      recommended: isRecommended,
      eventName: filter?.eventName, // Aplica filtro de nome do evento
      eventTypesIds: filter?.EventTypesIds, // Aplica filtro de tipo de evento
      musicalGenreIds: filter?.MuscalGenreIds, // Aplica filtro de gênero musical
      startDate,
      endDate,
    });

    setLoading(false);
    setTotalPages(upcomingPromise.data.totalPages); // Define o total de páginas
    setEvents((prev: any) => [...prev, ...upcomingPromise.data.items]); // Adiciona os eventos
  };

  useEffect(() => {
    const { happeningNow, recommended } = params;
    setRecommended(recommended);
    setHappeningNow(happeningNow);
    setPage(1); // Reseta a página para 1 ao recarregar
    if (happeningNow) {
      loadEventsHappeningNow(recommended, 1);
      return;
    }
    loadEventsUpcoming(recommended, 1);
  }, []);

  const onEndReached = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
      if (happeningNow) {
        loadEventsHappeningNow(recommended, page + 1);
      } else {
        loadEventsUpcoming(recommended, page + 1);
      }
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1); // Volta para a primeira página
    setEvents([]); // Limpa os eventos antes de carregar novamente
    if (happeningNow) {
      loadEventsHappeningNow(recommended, 1).then(() => setRefreshing(false));
    } else {
      loadEventsUpcoming(recommended, 1).then(() => setRefreshing(false));
    }
  }, [happeningNow, recommended]);

  const SkeletonCards = () => (
    <>
      {loading && (
        <View style={styles.cardWrapper}>
          {skeletonArray.map((item: any) => (
            <Skeleton
              key={item}
              style={styles.skeletonStyle}
              animation="wave"
              width={150}
              height={30}
            />
          ))}
        </View>
      )}
    </>
  );

  const typingTimeout = useRef<any>(null);
  const searchbarRef = useRef<any>(null);

  const applyFilters = (newFilters: any) => {
    setFilters(newFilters);
    setPage(1);
    setTotalPages(1);
    setEvents([]);

    if (happeningNow) {
      loadEventsHappeningNow(recommended, 1, newFilters); // Recarrega eventos de acordo com os filtros
    } else {
      loadEventsUpcoming(recommended, 1, newFilters);
    }
  };

  const handleFilterSubmit = (filters: any) => {
    const newFilters = {
      eventName: filters?.eventName,
      maxDistanceInKm: filters?.maxDistanceInKm,
      eventTypesIds: filters?.EventTypesIds,
      muscalGenreIds: filters?.MuscalGenreIds,
      startDate: filters?.StartDate,
      endDate: filters?.EndDate,
    };
    applyFilters(newFilters);
  };

  const onChangeSearch = (query: string) => {
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      handleFilterSubmit({ ...filters, eventName: query });
    }, 400);
  };

  return (
    <Container>
      <Header text="Rolando agora"></Header>

      <View style={styles.searchWrapper}>
        <TextInput
          mode="outlined"
          label="Pesquise ou filtre"
          textContentType="emailAddress"
          ref={searchbarRef}
          onChangeText={onChangeSearch}
          style={{ fontSize: 18, height: 56, flex: 1 }}
          returnKeyType="next"
        />
        <ButtonGeneric outline icon="filter"></ButtonGeneric>
      </View>

      {events.length === 0 && <SkeletonCards />}

      {events.length === 0 && !loading ? (
        <View style={styles.noEventsContainer}>
          <Text style={styles.noEventsText}>Não há eventos disponíveis.</Text>
          {!recommended && (
            <Text style={styles.communityText}>
              Está em algum evento? Informe a comunidade.
            </Text>
          )}

          <ButtonGeneric
            style={{ alignSelf: "center", marginTop: 20 }}
            onPress={() => navigation.navigate("Evento")}
            text="Criar Evento"
            icon="plus"
          ></ButtonGeneric>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.cardWrapper}
          onScrollEndDrag={onEndReached} // Dispara quando chegar ao fim
          refreshControl={
            <RefreshControl
              colors={["#333"]}
              tintColor="#fff"
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          {events.map((event: any) => (
            <View style={styles.card} key={event.eventId}>
              <SimpleCardEvent event={event}></SimpleCardEvent>
            </View>
          ))}
          <SkeletonCards />
        </ScrollView>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  searchWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    width: "100%",
    alignItems: "center",
    height: 56,
    marginTop: 20,
  },
  cardWrapper: {
    marginTop: 20,
    marginBottom: 40,
  },
  card: {
    marginTop: 12,
  },
  skeletonStyle: {
    opacity: 0.3,
    width: "100%",
    height: 90,
    borderRadius: 10,
    marginTop: 12,
  },
  noEventsContainer: {
    display: "flex",
    justifyContent: "center",
    marginVertical: 20,
    flex: 1,
  },
  noEventsText: {
    fontFamily: "PlusJakartaSans-500",
    fontSize: 20,
    color: "#FFF",
    width: "80%",
    textAlign: "center",
    alignSelf: "center",
    marginBottom: 10,
  },
  communityText: {
    fontFamily: "PlusJakartaSans-500",
    fontSize: 16,
    color: "#FFF",
    width: "80%",
    textAlign: "center",
    alignSelf: "center",
  },
});
