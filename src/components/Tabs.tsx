import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface Tab {
  name: string;
  // Adicione mais propriedades se necessário
}

interface TabsProps {
  tabs: Tab[];
  selectedIndex: number; // Adiciona esta prop
  onTabChange?: (index: number) => void;
}

export default function Tabs({
  tabs = [],
  selectedIndex,
  onTabChange,
}: TabsProps) {
  const [animation] = useState<any>(new Animated.Value(selectedIndex));

  useEffect(() => {
    Animated.timing(animation, {
      toValue: selectedIndex,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [selectedIndex]);

  const handlePress = (index: number) => {
    if (index !== selectedIndex && onTabChange) {
      onTabChange(index); 
    }
  };

  const translateX = animation.interpolate({
    inputRange: tabs.map((_, i) => i),
    outputRange: tabs.map((_, i) => i * 4), 
  });

  return (
    <View style={styles.container}>
      {tabs.map((tab: any, index: number) => (
        <TouchableOpacity
          key={index}
          style={styles.option}
          onPress={() => handlePress(index)}
        >
          <Text
            style={index === selectedIndex ? styles.textSelected : styles.text}
          >
            {tab.name}
          </Text>
          {index === selectedIndex && (
            <Animated.View
              style={[styles.selectBox, { transform: [{ translateX }] }]}
            ></Animated.View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 28,
  },
  option: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  selectBox: {
    backgroundColor: "#4DC2FF",
    width: 42,
    height: 4,
    borderRadius: 100,
    position: "absolute",
    bottom: -14, // Adjust based on your layout
  },
  text: {
    color: "#FFF",
    fontSize: 18,
    fontFamily: "PlusJakartaSans-600",
  },
  textSelected: {
    color: "#99DCFF",
    fontSize: 18,
    fontFamily: "PlusJakartaSans-600",
  },
});
