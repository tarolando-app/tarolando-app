import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from "react-native";
import { Searchbar } from "react-native-paper";
import CardWrapper from "../components/CardWrapper";
import TextGeneric from "../components/TextGeneric";
import Header from "../components/Header";
import { fetchGoogleAutocomplete } from "../services/googleService";
import { useLocation } from "../contexts/LocationContext";
import SkeletonLoadingSearch from "./skeletons/SkeletonLoadingSearch";
import { KeyboardAvoidingView, Platform } from "react-native";

interface LocationSearchModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectPlace: (place: any) => void;
}

const LocationSearchModal: React.FC<LocationSearchModalProps> = ({
  visible,
  onClose,
  onSelectPlace,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const { location } = useLocation();
  const typingTimeout = useRef<any>(null);
  const searchbarRef = useRef<any>(null);

  useEffect(() => {
    if (visible && searchbarRef.current) {
      setTimeout(() => {
        searchbarRef.current?.focus();
      }, 300);
    }
  }, [visible]);

  const handleSearch = async (query: string) => {
    if (query.length == 0) {
      return;
    }

    const searchBody = {
      input: query,
      locationBias: {
        circle: {
          center: {
            latitude: location?.latitude,
            longitude: location?.longitude,
          },
          radius: 300,
        },
      },
    };
    setLoading(true);
    const result = await fetchGoogleAutocomplete(searchBody);
    setLoading(false);
    setPlaces(result.data?.suggestions || []);
  };

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      handleSearch(query);
    }, 400);
  };

  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.modalContainer}
    >
      <View style={styles.modalContent}>
        <Header action={onClose} text="Informe a localização" />
        <Searchbar
          ref={searchbarRef}
          style={{ backgroundColor: "#333" }}
          placeholder="Buscar localização"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <ScrollView style={styles.searchResults}>
          {loading && <SkeletonLoadingSearch />}
          {places.length == 0 && (
            <View style={{ marginHorizontal: "auto", marginTop: "20%" }}>
              <TextGeneric weight={200}>Faça sua busca...</TextGeneric>
            </View>
          )}
          {places.map((item: any) => (
            <TouchableOpacity
              key={item.placePrediction?.placeId}
              style={{ marginTop: 8 }}
              onPress={() => {
                onSelectPlace(item);
                onClose();
              }}
            >
              <CardWrapper>
                <TextGeneric size={16}>
                  {item.placePrediction?.structuredFormat?.mainText?.text}
                </TextGeneric>
                <TextGeneric size={14} weight={500} color="#828385">
                  {item.placePrediction?.structuredFormat?.secondaryText?.text}
                </TextGeneric>
              </CardWrapper>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#171719",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "90%",
  },
  searchResults: {
    marginTop: 16,
  },
});

export default LocationSearchModal;
