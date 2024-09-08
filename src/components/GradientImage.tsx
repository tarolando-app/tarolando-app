import React from "react";
import { View, StyleSheet, Image, ViewStyle, ImageStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface GradientImageProps {
  width: any;
  height: number;
  url: string;
}

const GradientImage: React.FC<GradientImageProps> = ({
  width,
  height,
  url,
}) => {
  return (
    <View style={[styles.container, { width, height }]}>
      <Image source={{ uri: url }} style={styles.image} resizeMode="cover" />
      <LinearGradient
        colors={["rgba(23, 23, 25, 0.3)", "#171719"]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  } as ViewStyle,
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  } as ImageStyle,
  gradient: {
    ...StyleSheet.absoluteFillObject,
  } as ViewStyle,
});

export default GradientImage;
