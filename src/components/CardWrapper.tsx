import { StyleSheet, View, StatusBar } from "react-native";

export default function CardWrapper({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) {
  return <View style={{ ...styles.container, ...style }}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#252527",
    padding: 12,
    borderRadius: 10
  },
});
