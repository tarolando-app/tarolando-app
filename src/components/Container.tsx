import { StyleSheet, View, StatusBar } from "react-native";

export default function Container({ children, style }: { children?: React.ReactNode, style?: any }) {
  const statusBarHeight = StatusBar.currentHeight || 0;

  return (
    <View style={{ paddingTop: statusBarHeight, ...styles.container, ...style }}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171719",
    paddingHorizontal: 16,
  },
});
