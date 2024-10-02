import React from "react";
import { View, Text, StyleSheet, ActivityIndicator, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import TextGeneric from "./TextGeneric";

export default function ButtonGeneric({
  text,
  size = 18,
  full = false,
  icon,
  iconPosition = "right",
  outline = false,
  disabled = false,
  loading = false,
  onlyIcon = false,
  onPress,
  style,
  weight,
}: any) {
  return (
    <TouchableOpacity
      disabled={disabled || loading}
      onPress={onPress}
      style={[full ? styles.fullWidth : { alignSelf: "flex-start" }, style]}
    >
      <LinearGradient
        colors={["#AE03FF", "#5756FF", "#00A8FF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.gradientContainer,
          full ? { width: "100%" } : {},
          (outline && !onlyIcon) && { padding: 2 },
          disabled && styles.disabledButton,
        ]}
      >
        <View style={[styles.container, (outline || onlyIcon) ? styles.outline : {}]}>
          {icon && iconPosition === "left" && (
            <MaterialCommunityIcons
              style={text && { marginRight: 10 }}
              name={icon}
              size={size + 5}
              color={"#FFF"}
            />
          )}
          {text && (
            <TextGeneric size={size} weight={weight}>
              {text}
            </TextGeneric>
          )}
          {loading ? (
            <ActivityIndicator
              size="small"
              color={"#FFF"}
              style={{ marginLeft: 10 }}
            />
          ) : (
            icon &&
            iconPosition === "right" && (
              <MaterialCommunityIcons
                style={text && { marginLeft: 10 }}
                name={icon}
                size={size + 5}
                color={"#FFF"}
              />
            )
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fullWidth: {
   flex: 1
  },
  gradientContainer: {
    borderRadius: 10,
    display: "flex",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 55,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  text: {
    color: "#FFF",
    fontFamily: "PlusJakartaSans-700",
  },
  outline: {
    backgroundColor: "#171719",
  },
  outlineText: {
    color: "#FFF",
  },
  disabledButton: {
    opacity: 0.5,
  },
});
