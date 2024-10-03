import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import TextGeneric from "../../../components/TextGeneric";
import CardWrapper from "../../../components/CardWrapper";
import ButtonGeneric from "../../../components/ButtonGeneric";
import {
  fetchEventType,
  fetchMusicalGenreType,
} from "../../../services/eventService";
import Chips from "../../../components/ChipsSelect";

export function StepTypeEvent({ submit, back }: any) {
  const [musicalGenres, setMusicalGenres] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [selectedMusicalGenres, setSelectedMusicalGenres] = useState([]);
  const [selectedEventTypes, setSelectedEventTypes] = useState();

  const getData = async () => {
    const responseMusicalGenres = await fetchMusicalGenreType();
    const responseEventTypes = await fetchEventType();

    setMusicalGenres(responseMusicalGenres.data);
    setEventTypes(responseEventTypes.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <CardWrapper style={{ marginTop: 32 }}>
        <TextGeneric size={22} weight={600}>
          Tipo e gênero do evento
        </TextGeneric>
        <Chips
          text="Tipo do evento"
          idName="eventTypeId"
          items={eventTypes}
          selectionChange={(item: any) => {
            setSelectedEventTypes(item);
            console.log(item)
          }}
        ></Chips>
        <Chips
          text="Gênero musical"
          multiple
          idName="musicalGenderId"
          items={musicalGenres}
          selectionChange={(item: any) => {
            setSelectedMusicalGenres(item);
            console.log(item)
          }}
        ></Chips>
      </CardWrapper>
      <View style={styles.buttons}>
        <ButtonGeneric
          onPress={() => back()}
          onlyIcon
          full
          text="Voltar"
          icon="arrow-left"
          iconPosition="left"
        ></ButtonGeneric>
        <ButtonGeneric
          onPress={() => {
            submit({
              MusicaGenresIds: selectedMusicalGenres,
              EventTypeId: selectedEventTypes,
            });
          }}
          disabled={!selectedEventTypes || selectedMusicalGenres.length == 0}
          text="Próximo"
          icon="arrow-right"
          full
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  buttons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    gap: 48,
    justifyContent: "space-between",
  },
});
