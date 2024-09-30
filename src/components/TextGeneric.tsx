import React from "react";
import { Text } from "react-native";

export default function TextGeneric({
  children,
  weight = 700,
  size = 18,
  color = "#FFF",
  style,
}: any) {
  return (
    <Text
      style={{
        ...{
          fontSize: size,
          color,
          fontFamily: `PlusJakartaSans-${weight}`,
        },
        ...style,
      }}
    >
      {children}
    </Text>
  );
}
