import { StyleSheet, Text, View, StatusBar, Keyboard } from "react-native";
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

  const [stepAboutEvent, setStepAboutEvent] = useState();
  const [stepDateEvent, setStepDateEvent] = useState();
  const [stepTypeEvent, setStepTypeEvent] = useState();
  const [stepPhotoEvent, setStepPhotoEvent] = useState();

  const handleStepAboutEvent = (data: any) => {
    setStepAboutEvent(data);
    setCurrentIndex(1);
  };

  const handleStepDateEvent = (data: any) => {
    setStepDateEvent(data);
    setCurrentIndex(2);
  };

  const handleStepTypeEvent = (data: any) => {
    setStepTypeEvent(data);
    setCurrentIndex(3);
  };

  const handleStepPhotoEvent = (data: any) => {
    setStepPhotoEvent(data);
  };

  const backStep = () => {
    setCurrentIndex(currentIndex - 1);
  };

  return (
    <Container>
      <Header text="Criar evento"></Header>
      <ScrollView>
        {!isKeyboardVisible && (
          <View style={{ marginTop: 24 }}>
            <TextGeneric size={26}>
              Preencha as etapas para criar seu novo evento
            </TextGeneric>
            <ProgressSteps
              steps={["Sobre", "Horário", "Tipo", "Capa"]}
              currentIndex={currentIndex}
            ></ProgressSteps>
          </View>
        )}

        <View style={[currentIndex !== 0 && { display: "none" }]}>
          <StepAboutEvent submit={handleStepAboutEvent}></StepAboutEvent>
        </View>

        <View style={[currentIndex !== 1 && { display: "none" }]}>
          <StepDateEvent
            submit={handleStepDateEvent}
            back={backStep}
          ></StepDateEvent>
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({});
