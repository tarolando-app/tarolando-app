import { StyleSheet, View } from "react-native";
import TextGeneric from "./TextGeneric";
import { ProgressBar } from "react-native-paper";

export default function ProgressSteps({ steps, currentIndex }: any) {
  const totalSteps = steps.length;
  const progress = (currentIndex + 1) / totalSteps;
  
  return (
    <View>
      <ProgressBar
        style={styles.progressBar}
        progress={progress}
        color={"#4DC2FF"}
      />
      <View style={styles.description}>
        {steps.map((step: string, index: number) => (
          <TextGeneric
            key={index}
            size={18}
            weight={500}
            style={index <= currentIndex ? styles.activeStep : styles.disableStep}
          >
            {step}
          </TextGeneric>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressBar: {
    backgroundColor: "#646566",
    height: 8,
    marginTop: 24,
    borderRadius: 10,
  },
  description: {
    marginTop: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  activeStep: {
    color: "#FFF", // Cor diferente para o step atual
  },
  disableStep: {
    color: "#828385",
  },
});
