import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import TextGeneric from "../../../components/TextGeneric";
import CardWrapper from "../../../components/CardWrapper";
import { TextInput } from "react-native-paper";
import ButtonGeneric from "../../../components/ButtonGeneric";
import LocationSearchModal from "../../../components/LocationSearchModal";
import { fetchGooglePlaceRegister } from "../../../services/googleService";

export function StepAboutEvent({ submit }: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [eventName, setEventName] = useState("");
  const [googlePlaceObject, setGooglePlaceObject] = useState({});

  const handlePlaceSelect = async (place: any) => {
    const body = {
      externalGooglePlaceId: place.placePrediction?.placeId,
    };

    const result = await fetchGooglePlaceRegister(body);

    setPlaceId(result?.data?.googlePlaceId);
    setGooglePlaceObject(result?.data);
    setSelectedPlace(place.placePrediction?.text?.text || "");
  };

  return (
    <>
      <CardWrapper style={{ marginTop: 32 }}>
        <TextGeneric size={22} weight={600}>
          Sobre o evento
        </TextGeneric>
        <View style={styles.inputs}>
          <View>
            <TextGeneric weight={500}>Nome do evento</TextGeneric>
            <TextInput
              mode="outlined"
              label=""
              placeholder="Pool Party"
              style={{ fontSize: 18, height: 56, marginTop: 8 }}
              onChangeText={(text) => setEventName(text)}
            />
          </View>
          <View>
            <TextGeneric weight={500}>Localização</TextGeneric>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <TextInput
                mode="outlined"
                label=""
                placeholder="Rua do Ciclano da Silva, 123"
                onPress={() => setModalVisible(true)}
                value={selectedPlace} // Exibe o local selecionado
                style={{ fontSize: 18, height: 56, marginTop: 8 }}
                editable={false}
              />
            </TouchableOpacity>
          </View>
        </View>
      </CardWrapper>
      <ButtonGeneric
        style={{ marginTop: 24 }}
        onPress={() => {
          submit({
            GooglePlaceId: placeId,
            Name: eventName,
            GooglePlaceObject: googlePlaceObject,
          });
        }}
        disabled={!eventName || !placeId}
        text="Próximo"
        icon="arrow-right"
        full
      />

      <LocationSearchModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectPlace={handlePlaceSelect}
      />
    </>
  );
}

const styles = StyleSheet.create({
  inputs: {
    marginTop: 32,
    marginBottom: 12,
    display: "flex",
    gap: 20,
  },
});