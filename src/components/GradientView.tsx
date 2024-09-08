import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface GradientViewProps {
  width: any;
  height: number;
  children: React.ReactNode;
}

const GradientView: React.FC<GradientViewProps> = ({ width, height, children }) => {
  return (
    <View style={[styles.container, { width, height }]}>
      {children}
      <LinearGradient
        colors={['#171719','#252527']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden', // Para garantir que o gradiente não ultrapasse o contêiner
  } as ViewStyle,
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    width: '100%',
    height: '100%', // Ajuste conforme necessário para cobrir a parte superior
  } as ViewStyle,
});

export default GradientView;
