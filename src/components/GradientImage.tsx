import React from "react";
import { View, StyleSheet, Image, ViewStyle, ImageStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface GradientImageProps {
  width: any;
  height: number;
  url?: string;
  src?: string;
  styleImage?: ImageStyle;
}

const GradientImage: React.FC<any> = ({
  width,
  height,
  url,
  src = require("../../assets/no-image.png"),
  styleImage,
  customShadow = 1,
  children
}) => {
  return (
    <View style={[styles.container, { width, height }]}>
      <Image
        source={url ? { uri: url } : src}
        style={{ ...styleImage, ...styles.image }}
        resizeMode="cover"
      />
      <LinearGradient
        colors={["rgba(23, 23, 25, 0.3)", "#171719"]}
        style={styles.gradient}
        start={{ x: 0, y: 0.6 }}
        end={{ x: 0, y: customShadow }}
      />
      {children}
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
  } as ImageStyle,
  gradient: {
    ...StyleSheet.absoluteFillObject,
  } as ViewStyle,
});

export default GradientImage;
