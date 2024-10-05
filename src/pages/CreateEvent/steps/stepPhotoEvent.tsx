import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import TextGeneric from "../../../components/TextGeneric";
import CardWrapper from "../../../components/CardWrapper";
import ButtonGeneric from "../../../components/ButtonGeneric";
import PhotoSelect from "../../../components/PhotoSelect";

export function StepPhotoEvent({ submit, back, googlePlacesImages = [], loading }: any) {
  const [selected, setSelected] = useState();

  return (
    <>
      <CardWrapper style={{ marginTop: 32 }}>
        <TextGeneric size={22} weight={600}>
          Capa do evento
        </TextGeneric>
        <TextGeneric weight={300} style={{ marginTop: 10 }}>
          Selecione uma imagem para a capa do seu evento.
        </TextGeneric>

        <PhotoSelect
          onSelected={(value: any) => {
            setSelected(value);
          }}
          googlePlacesImages={googlePlacesImages}
        ></PhotoSelect>
      </CardWrapper>
      <View style={styles.buttons}>
        <ButtonGeneric
          onPress={() => {
            submit(selected);
          }}
          loading={loading}
          text="Criar evento"
          icon="check"
          full
        />
        <ButtonGeneric
          onPress={() => back()}
          onlyIcon
          full
          text="Voltar"
        ></ButtonGeneric>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: 24,
    gap: 48,
    paddingBottom: 90,
  },
});
