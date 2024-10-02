import { StyleSheet, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import ButtonGeneric from "./ButtonGeneric";
import TextGeneric from "./TextGeneric";

export default function Header({ text, action }: any) {
  const navigation = useNavigation<any>();

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("Home");
    }
  };

  return (
    <View style={styles.header}>
      <View style={{zIndex: 50}}>
        <ButtonGeneric
          onPress={action? () => {action()} : handleGoBack}
          onlyIcon
          size={20}
          icon="arrow-left"
        />
      </View>

      <View style={styles.textHeader}>
        <TextGeneric size={20}>{text}</TextGeneric>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
  },
  textHeader: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: '100%',
    height: 56,
    justifyContent: "center",
  },
});
