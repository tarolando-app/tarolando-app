import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import TextGeneric from "../../../components/TextGeneric";
import CardWrapper from "../../../components/CardWrapper";
import { TextInput } from "react-native-paper";
import ButtonGeneric from "../../../components/ButtonGeneric";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment"; // Importando moment

export function StepDateEvent({ submit, back }: any) {
  const [eventName, setEventName] = useState(""); // Para exibir no botão
  const [eventStartDate, setEventStartDate] = useState<string>(""); // Data original no formato ISO
  const [formattedDate, setFormattedDate] = useState<string>(""); // Data formatada para exibição
  const [eventDuration, setEventDuration] = useState<string>(""); // Duração do evento em horas
  const [eventEndDate, setEventEndDate] = useState<string>(""); // Data final calculada

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // Definir a data atual ao iniciar o componente
  useEffect(() => {
    const currentDate = moment(); // Data e hora atuais
    setEventStartDate(currentDate.format()); // Armazenando no formato ISO
    setFormattedDate(currentDate.format("DD/MM/YYYY - HH:mm")); // Formatando para exibição
  }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    const isoDate = moment(date).format();
    console.log(isoDate);
    setEventStartDate(isoDate);

    const formatted = moment(date).format("DD/MM/YYYY - HH:mm");
    setFormattedDate(formatted);

    hideDatePicker();
  };

  const handleDurationChange = (hours: string) => {
    setEventDuration(hours);

    if (eventStartDate && !isNaN(Number(hours))) {
      const newDate = moment(eventStartDate).add(Number(hours), "hours");
      setEventEndDate(newDate.format());
    } else {
      setEventEndDate("");
    }
  };

  return (
    <>
      <CardWrapper style={{ marginTop: 32 }}>
        <TextGeneric size={22} weight={600}>
          Informe os horários
        </TextGeneric>
        <View style={styles.inputs}>
          <View>
            <TextGeneric weight={500}>Data e hora de início</TextGeneric>
            <TouchableOpacity onPress={showDatePicker}>
              <TextInput
                mode="outlined"
                onPress={showDatePicker}
                label=""
                readOnly
                value={formattedDate} // Exibindo a data formatada no input
                placeholder="Data início"
                style={{ fontSize: 18, height: 56, marginTop: 8 }}
              />
            </TouchableOpacity>

            <DateTimePickerModal
              isDarkModeEnabled
              locale="pt_BR"
              backdropStyleIOS={{
                backgroundColor: "#333",
              }}
              isVisible={isDatePickerVisible}
              mode="datetime"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          <View>
            <TextGeneric weight={500}>Duração do evento (horas)</TextGeneric>
            <TextInput
              mode="outlined"
              label=""
              keyboardType="number-pad"
              placeholder="Informe em horas"
              style={{ fontSize: 18, height: 56, marginTop: 8 }}
              onChangeText={handleDurationChange} // Atualizando a duração
              value={eventDuration} // Exibindo a duração no input
            />
          </View>
        </View>
      </CardWrapper>
      <View
        style={styles.buttons}
      >
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
              DateAndTime: eventStartDate.slice(0, 16),
              ClosingDate: eventEndDate.slice(0, 16),
            });
          }}
          disabled={!eventStartDate || !eventDuration}
          full
          text="Próximo"
          icon="arrow-right"
        />
      </View>
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
  buttons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    gap: 48,
    justifyContent: "space-between",
  },
});
