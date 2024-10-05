import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Keyboard,
  Alert,
} from "react-native";
import ButtonGeneric from "../../components/ButtonGeneric";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import TextGeneric from "../../components/TextGeneric";
import Header from "../../components/Header";
import Container from "../../components/Container";
import { ProgressBar } from "react-native-paper";
import ProgressSteps from "../../components/ProgressSteps";
import CardWrapper from "../../components/CardWrapper";
import { StepAboutEvent } from "./steps/stepAboutEvent";
import { ScrollView } from "react-native-gesture-handler";
import { StepDateEvent } from "./steps/stepDateEvent";
import { fetchGooglePlaceRegister } from "../../services/googleService";
import { StepTypeEvent } from "./steps/stepTypeEvent";
import { StepPhotoEvent } from "./steps/stepPhotoEvent";
import { submitEventForm } from "../../services/eventService";
import { useEvents } from "../../hooks/useEvents";

export default function CreateEvent() {
  const statusBarHeight = StatusBar.currentHeight || 0;
  const navigation = useNavigation<any>();

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const [googlePlaceObject, setGooglePlaceObject] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const [stepAboutEvent, setStepAboutEvent] = useState();
  const [stepDateEvent, setStepDateEvent] = useState();
  const [stepTypeEvent, setStepTypeEvent] = useState();
  const [stepPhotoEvent, setStepPhotoEvent] = useState();

  const handleStepAboutEvent = async (data: any) => {
    setStepAboutEvent(data);
    setCurrentIndex(1);

    const body = {
      externalGooglePlaceId: data.GooglePlaceId,
    };

    const result = await fetchGooglePlaceRegister(body);
    console.log(result.data);
    setGooglePlaceObject(result?.data);
  };

  const handleStepDateEvent = (data: any) => {
    setStepDateEvent(data);
    setCurrentIndex(2);
  };

  const handleStepTypeEvent = (data: any) => {
    setStepTypeEvent(data);
    setCurrentIndex(3);
  };

  const handleStepPhotoEvent = async (data: any) => {
    setStepPhotoEvent(data);
    console.log();

    const body = {
      googlePlaceId: googlePlaceObject?.googlePlaceId,
      stepAboutEvent,
      stepDateEvent,
      stepTypeEvent,
      stepPhotoEvent: data,
    };
    setLoading(true);
    const result = await submitEventForm(body);
    setLoading(false);
    if (result) {
      Alert.alert("Evento criado com sucesso!", "Seu evento já está no ar.");
      navigation.navigate("Início", { reload: true });
    }
  };

  const backStep = () => {
    setCurrentIndex(currentIndex - 1);
  };

  return (
    <Container>
      <Header text="Criar evento"></Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 24 }}>
          <TextGeneric size={26}>
            Preencha as etapas para criar seu novo evento
          </TextGeneric>
          <ProgressSteps
            steps={["Sobre", "Horário", "Tipo", "Capa"]}
            currentIndex={currentIndex}
          ></ProgressSteps>
        </View>

        <View style={[currentIndex !== 0 && { display: "none" }]}>
          <StepAboutEvent submit={handleStepAboutEvent}></StepAboutEvent>
        </View>

        <View style={[currentIndex !== 1 && { display: "none" }]}>
          <StepDateEvent
            submit={handleStepDateEvent}
            back={backStep}
          ></StepDateEvent>
        </View>

        <View
          style={[
            currentIndex !== 2 && { display: "none" },
            { paddingBottom: 58 },
          ]}
        >
          <StepTypeEvent
            submit={handleStepTypeEvent}
            back={backStep}
          ></StepTypeEvent>
        </View>

        {currentIndex == 3 && (
          <StepPhotoEvent
            googlePlacesImages={
              googlePlaceObject ? googlePlaceObject.googlePlacesImages : []
            }
            submit={handleStepPhotoEvent}
            loading={loading}
            back={backStep}
          ></StepPhotoEvent>
        )}
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({});
